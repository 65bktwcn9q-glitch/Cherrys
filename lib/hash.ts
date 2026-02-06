import crypto from "crypto";

const salt = process.env.IP_HASH_SALT ?? "local-dev-salt";

export function hashValue(value: string) {
  return crypto.createHash("sha256").update(`${value}:${salt}`).digest("hex");
}
