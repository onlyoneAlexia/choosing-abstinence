import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const dailyMetrics = sqliteTable("daily_metrics", {
  day: text("day").notNull(),
  source: text("source").notNull(),
  kind: text("kind").notNull(),
  count: integer("count").notNull().default(0),
}, (t) => [primaryKey({ columns: [t.day, t.source, t.kind] })]);
