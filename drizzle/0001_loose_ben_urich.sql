CREATE TABLE `booking_channels` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`name` text NOT NULL,
	`channel_type` text NOT NULL,
	`commission_basis_points` integer NOT NULL,
	`active` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `booking_channels_property_name_key` ON `booking_channels` (`property_id`,`name`);--> statement-breakpoint
CREATE INDEX `booking_channels_property_active_idx` ON `booking_channels` (`property_id`,`active`);--> statement-breakpoint
CREATE TABLE `business_days` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`business_date` text NOT NULL,
	`status` text NOT NULL,
	`opened_at` text NOT NULL,
	`closed_at` text,
	`closed_by_employee_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `business_days_property_date_key` ON `business_days` (`property_id`,`business_date`);--> statement-breakpoint
CREATE TABLE `maintenance_work_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`room_id` text NOT NULL,
	`note` text NOT NULL,
	`status` text NOT NULL,
	`block_room` integer NOT NULL,
	`block_reason` text,
	`block_from` text,
	`block_to` text,
	`unblock_reason` text,
	`unblocked_at` text,
	`created_by_employee_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by_employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `maintenance_room_status_idx` ON `maintenance_work_orders` (`room_id`,`status`);