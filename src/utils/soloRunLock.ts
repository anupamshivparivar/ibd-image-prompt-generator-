/**
 * IBD Global Solo-Run Execution Lock Manager
 * 
 * Enforces strict 1-module isolation across the application interface to prevent
 * parallel token-draining jobs and race conditions.
 */

export interface RunningModuleState {
  moduleId: string;
  moduleName: string;
  startTime: number;
}

type LockListener = (state: RunningModuleState | null) => void;

class SoloRunLockManager {
  private currentRunning: RunningModuleState | null = null;
  private listeners: Set<LockListener> = new Set();

  /**
   * Checks if any module is currently running.
   */
  public isRunning(): boolean {
    return this.currentRunning !== null;
  }

  /**
   * Returns the current running module state or null if idle.
   */
  public getRunningModule(): RunningModuleState | null {
    return this.currentRunning;
  }

  /**
   * Acquire execution lock for a module.
   * If another module is already executing, throws/returns an error blocking execution.
   */
  public acquireLock(moduleId: string, moduleName: string): { success: boolean; error?: string } {
    if (this.currentRunning && this.currentRunning.moduleId !== moduleId) {
      const errorMsg = `[Solo-Run Lock]: Execution blocked. "${this.currentRunning.moduleName}" is currently synthesizing. Wait for it to finish.`;
      return { success: false, error: errorMsg };
    }

    this.currentRunning = {
      moduleId,
      moduleName,
      startTime: Date.now(),
    };

    this.notifyListeners();
    return { success: true };
  }

  /**
   * Release the execution lock when a module finishes or encounters an error.
   */
  public releaseLock(moduleId: string): void {
    if (this.currentRunning && this.currentRunning.moduleId === moduleId) {
      this.currentRunning = null;
      this.notifyListeners();
    }
  }

  /**
   * Force reset the lock in emergency or manual override.
   */
  public forceReset(): void {
    this.currentRunning = null;
    this.notifyListeners();
  }

  /**
   * Subscribe to lock state changes.
   */
  public subscribe(listener: LockListener): () => void {
    this.listeners.add(listener);
    listener(this.currentRunning);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentRunning);
      } catch (err) {
        console.error("Error in solo-run lock listener:", err);
      }
    });
  }
}

export const soloRunLock = new SoloRunLockManager();

/**
 * Higher-order helper function to execute an async module task under the Solo-Run Lock.
 * Returns null if blocked by another module, otherwise returns the result.
 */
export async function runWithSoloLock<T>(
  moduleId: string,
  moduleName: string,
  task: () => Promise<T>,
  onBlocked?: (errorMsg: string) => void
): Promise<T | null> {
  const lockResult = soloRunLock.acquireLock(moduleId, moduleName);
  if (!lockResult.success) {
    if (onBlocked) {
      onBlocked(lockResult.error || "Execution blocked by active Solo-Run lock.");
    }
    return null;
  }

  try {
    return await task();
  } finally {
    soloRunLock.releaseLock(moduleId);
  }
}
