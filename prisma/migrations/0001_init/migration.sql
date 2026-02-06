-- Create enums
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "ListingStatus" AS ENUM ('DRAFT', 'PENDING', 'ACTIVE', 'REJECTED', 'ARCHIVED');
CREATE TYPE "ContactPreference" AS ENUM ('TELEGRAM', 'DISCORD', 'BOTH');
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'REVIEWED', 'CLOSED');
CREATE TYPE "AdPlacementKey" AS ENUM ('HOME_TOP', 'HOME_MID', 'CATALOG_SIDEBAR', 'LISTING_BOTTOM', 'GAME_TOP');
CREATE TYPE "AdEventType" AS ENUM ('IMPRESSION', 'CLICK');

CREATE TABLE "User" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL UNIQUE,
  "username" TEXT NOT NULL UNIQUE,
  "displayName" TEXT,
  "bio" TEXT,
  "avatarUrl" TEXT,
  "telegram" TEXT,
  "discord" TEXT,
  "role" "Role" NOT NULL DEFAULT 'USER',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "Game" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" TEXT NOT NULL UNIQUE,
  "title" TEXT NOT NULL,
  "coverUrl" TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE "Category" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "slug" TEXT NOT NULL UNIQUE,
  "title" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE "Listing" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"("id"),
  "gameId" UUID NOT NULL REFERENCES "Game"("id"),
  "categoryId" UUID NOT NULL REFERENCES "Category"("id"),
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "snippet" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "currency" TEXT NOT NULL,
  "platform" TEXT NOT NULL,
  "language" TEXT NOT NULL,
  "country" TEXT,
  "tags" TEXT[] NOT NULL,
  "contactPreference" "ContactPreference" NOT NULL,
  "isOnline" BOOLEAN NOT NULL DEFAULT false,
  "status" "ListingStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "viewCount" INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX "Listing_gameId_categoryId_status_createdAt_idx" ON "Listing"("gameId", "categoryId", "status", "createdAt");
CREATE INDEX "Listing_price_idx" ON "Listing"("price");
CREATE INDEX "Listing_platform_idx" ON "Listing"("platform");

CREATE TABLE "ListingImage" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "listingId" UUID NOT NULL REFERENCES "Listing"("id"),
  "url" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "Report" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "listingId" UUID NOT NULL REFERENCES "Listing"("id"),
  "reporterUserId" UUID REFERENCES "User"("id"),
  "reason" TEXT NOT NULL,
  "details" TEXT,
  "status" "ReportStatus" NOT NULL DEFAULT 'OPEN',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "AdPlacement" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "placementKey" "AdPlacementKey" NOT NULL,
  "title" TEXT NOT NULL,
  "imageUrl" TEXT,
  "linkUrl" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "weight" INTEGER NOT NULL DEFAULT 1,
  "startAt" TIMESTAMP,
  "endAt" TIMESTAMP,
  "advertiserName" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "AdEvent" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "adId" UUID NOT NULL REFERENCES "AdPlacement"("id"),
  "type" "AdEventType" NOT NULL,
  "listingId" UUID,
  "gameId" UUID,
  "pagePath" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "ipHash" TEXT,
  "userAgentHash" TEXT
);

CREATE TABLE "AdStatsDaily" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "adId" UUID NOT NULL REFERENCES "AdPlacement"("id"),
  "date" TEXT NOT NULL,
  "impressions" INTEGER NOT NULL DEFAULT 0,
  "clicks" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "adId_date" UNIQUE ("adId", "date")
);

CREATE TABLE "Confirmation" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "listingId" UUID NOT NULL REFERENCES "Listing"("id"),
  "sellerUserId" UUID NOT NULL,
  "buyerName" TEXT,
  "rating" INTEGER NOT NULL,
  "text" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "isApproved" BOOLEAN NOT NULL DEFAULT false
);
