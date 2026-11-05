CREATE TABLE `daily_metrics` (
	`day` text NOT NULL,
	`source` text NOT NULL,
	`kind` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`day`, `source`, `kind`)
);
