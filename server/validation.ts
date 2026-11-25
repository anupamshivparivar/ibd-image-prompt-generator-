import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

// Common string validators
const safeString = (max = 1000) => z.string().trim().max(max);
const optionalSafeString = (max = 1000) => safeString(max).optional();
const optionalApiKey = z.string().trim().max(256).optional();

export const ForgeRequestSchema = z.object({
  subject: optionalSafeString(300).default("Param-Shiva Supreme Singularity"),
  story: optionalSafeString(2000).default("Non-Dual Realism where the unmanifest cosmic void collapses into the golden seed of creation"),
  dim: optionalSafeString(20).default("16:9"),
  version: z.union([z.number(), z.string()]).optional().default(17),
  targetEngine: optionalSafeString(100).default("Midjourney v6.1"),
  mood: optionalSafeString(200).default("V-Paratpar / Ananta-Bija (The Singularity)"),
  lightingStyle: optionalSafeString(300).default("Atman-Sync Swayam-Jyoti (Geometric Source)"),
  shastraDetails: z.array(z.string().trim().max(300)).max(20).optional().default([
    "Planck-length Detail",
    "Sanskrit Yantra Geometry",
    "Sacred Gold & Stone Seal",
    "8K Octane Octahedral Polish",
  ]),
  sampler: optionalSafeString(100),
  cinemaStyle: optionalSafeString(200),
  autoDeityMode: z.boolean().optional().default(false),
  customApiKey: optionalApiKey,
});

export const UniversalRequestSchema = z.object({
  category: optionalSafeString(200).default("Devotional (Divine/Mythology)"),
  subject: optionalSafeString(300).default("Benefits of Tulsi / Ayurvedic Life"),
  story: optionalSafeString(2000).default("Ancient holistic healing wisdom with natural vitality"),
  dim: optionalSafeString(20).default("16:9"),
  version: z.union([z.number(), z.string()]).optional().default(11),
  customApiKey: optionalApiKey,
});

export const VishwaVartaRequestSchema = z.object({
  category: optionalSafeString(200).default("Breaking News (Urgent/Trending)"),
  story: optionalSafeString(2000).default("Historic discovery of ancient Vedic astronomical alignment"),
  dim: optionalSafeString(20).default("9:16"),
  version: z.union([z.number(), z.string()]).optional().default(12),
  customApiKey: optionalApiKey,
});

export const SamvaadRequestSchema = z.object({
  category: optionalSafeString(200).default("Community Miracle (Viewer Story)"),
  timeOfDay: optionalSafeString(200).default("Brahma Muhurta (Soft Gold/Pink 4AM)"),
  dim: optionalSafeString(20).default("9:16"),
  mood: optionalSafeString(200).default("Peaceful & Meditative"),
  story: optionalSafeString(2000).default("A devotee felt sudden divine protection and peace during difficult times"),
  customApiKey: optionalApiKey,
});

export const DharmaSutraRequestSchema = z.object({
  strategy: optionalSafeString(200).default("Heartland (Traditional/Regional Focus)"),
  language: optionalSafeString(200).default("Hindi/Sanskrit (Devanagari)"),
  dim: optionalSafeString(20).default("16:9"),
  series: optionalSafeString(300).default("Ramayana Flagship Series 2026"),
  story: optionalSafeString(2000).default("Lord Rama with divine Kodanda bow standing at the seashore at twilight before building Setu"),
  customApiKey: optionalApiKey,
});

export const SovereignPromptSchema = z.object({
  subject: optionalSafeString(300).default("Veer Hanuman in Deep Dhyana"),
  sankalpa: optionalSafeString(3000).default(
    "Lord Hanuman in deep meditative Dhyana inside an ancient stone mandapa sanctum with shafts of morning golden sunbeams piercing jali lattices, dewy tulsi garlands, and pure Swayam-Jyoti radiance from his heart center."
  ),
  version: z.union([z.number(), z.string()]).optional().default(17),
  styleLibrary: optionalSafeString(300).default("HP V19 (Volumetric Rays - Sacred Light & Incense Haze)"),
  slot: optionalSafeString(300).default("V20 (Aarti & Garbhagriha Fire Illumination)"),
  dim: optionalSafeString(20).default("9:16"),
  targetEngine: optionalSafeString(100).default("Midjourney v6.1"),
  tithiSeason: optionalSafeString(200).default("Brahma Muhurta (4:00 AM Dawn)"),
  drishtiMapping: z.boolean().optional().default(true),
  swayamJyoti: z.boolean().optional().default(true),
  brandSafeZones: z.boolean().optional().default(true),
  customApiKey: optionalApiKey,
});

export const CarouselV26RequestSchema = z.object({
  subject: optionalSafeString(300).default("Garbhagriha Sanctum Sanctorum Mysteries"),
  concept: optionalSafeString(3000).default("A 7-frame visual journey exploring the hidden spiritual and physical layers of an ancient temple inner sanctum."),
  platform: optionalSafeString(100).default("Instagram"),
  aspectRatio: optionalSafeString(20).default("9:16"),
  targetEngine: optionalSafeString(100).default("Midjourney v6.1"),
  toneGenre: optionalSafeString(300).default("Sacred Architectural Mystery & Devotional Darshan"),
  customApiKey: optionalApiKey,
});

export const V25CommandRequestSchema = z.object({
  weekday: z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]).or(safeString(10)).default("MON"),
  contentType: z.union([z.number(), z.string()]).optional().default(1),
  v24SceneId: z.union([z.number(), z.string()]).optional().default(1),
  dSlotId: optionalSafeString(50).default("MON-01"),
  dSlotTheme: optionalSafeString(300).default("Somnath Jyotirlinga (Gujarat Seacoast Sanctum)"),
  productionEngine: optionalSafeString(200).default("VP21 — Temple Sanctum"),
  platformGroup: z.union([z.number(), z.string()]).optional().default(1),
  brandIdentity: z.enum(["IBD", "ASP", "RKM"]).or(safeString(20)).default("IBD"),
  vaSlot: optionalSafeString(50).default("VA03"),
  customApiKey: optionalApiKey,
});

/**
 * Express middleware helper to validate request body with Zod schema.
 */
export function validateBody<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body || {});
    if (!result.success) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Request body contains invalid or malformed fields.",
        details: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    // Replace req.body with parsed & defaulted data
    req.body = result.data;
    next();
  };
}
