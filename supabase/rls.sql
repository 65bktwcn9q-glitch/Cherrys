-- Enable RLS
ALTER TABLE "Listing" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Game" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ListingImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Report" ENABLE ROW LEVEL SECURITY;

-- Public read for active listings
CREATE POLICY "Public listings" ON "Listing"
  FOR SELECT
  USING (status = 'ACTIVE');

-- Owners can manage their listings
CREATE POLICY "Owner listings" ON "Listing"
  FOR ALL
  USING (auth.uid()::text = "userId")
  WITH CHECK (auth.uid()::text = "userId");

-- Public read games and categories
CREATE POLICY "Public games" ON "Game" FOR SELECT USING (isActive = true);
CREATE POLICY "Public categories" ON "Category" FOR SELECT USING (isActive = true);

-- Listing images readable when listing is active
CREATE POLICY "Public listing images" ON "ListingImage"
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM "Listing" WHERE "Listing"."id" = "ListingImage"."listingId" AND "Listing"."status" = 'ACTIVE'));

-- Reports can be created by authenticated users
CREATE POLICY "Report create" ON "Report"
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
