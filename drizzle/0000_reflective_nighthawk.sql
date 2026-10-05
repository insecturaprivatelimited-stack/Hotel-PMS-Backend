CREATE TABLE `audit_events` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`actor_employee_id` text,
	`occurred_at` text NOT NULL,
	`action` text NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`reason` text,
	`safe_change_summary` text,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`actor_employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `audit_events_entity_idx` ON `audit_events` (`entity_type`,`entity_id`);--> statement-breakpoint
CREATE TABLE `cash_drops` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`drop_date` text NOT NULL,
	`shift` text NOT NULL,
	`expected_cents` integer NOT NULL,
	`counted_cents` integer NOT NULL,
	`difference_cents` integer NOT NULL,
	`dropped_cents` integer NOT NULL,
	`manager_employee_id` text,
	`status` text NOT NULL,
	`notes` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`manager_employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `cash_drops_property_date_idx` ON `cash_drops` (`property_id`,`drop_date`);--> statement-breakpoint
CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`name` text NOT NULL,
	`contact_person` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`billing_address` text NOT NULL,
	`status` text NOT NULL,
	`payment_terms_days` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `companies_property_status_idx` ON `companies` (`property_id`,`status`);--> statement-breakpoint
CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`status` text NOT NULL,
	`hourly_rate_cents` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `employees_property_status_idx` ON `employees` (`property_id`,`status`);--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`expense_date` text NOT NULL,
	`category` text NOT NULL,
	`vendor` text NOT NULL,
	`description` text NOT NULL,
	`payment_method` text NOT NULL,
	`amount_cents` integer NOT NULL,
	`notes` text,
	`receipt_reference` text,
	`status` text NOT NULL,
	`entered_by_employee_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`entered_by_employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `expenses_property_date_idx` ON `expenses` (`property_id`,`expense_date`);--> statement-breakpoint
CREATE TABLE `guests` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`phone` text NOT NULL,
	`phone_normalized` text NOT NULL,
	`city` text,
	`email` text,
	`guest_status` text NOT NULL,
	`preferred_rate_cents` integer,
	`notes` text,
	`archived_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `guests_property_phone_idx` ON `guests` (`property_id`,`phone_normalized`);--> statement-breakpoint
CREATE INDEX `guests_property_name_idx` ON `guests` (`property_id`,`last_name`,`first_name`);--> statement-breakpoint
CREATE TABLE `housekeeping_records` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`room_id` text NOT NULL,
	`employee_id` text,
	`service_date` text NOT NULL,
	`service_type` text NOT NULL,
	`status` text NOT NULL,
	`assigned_at` text,
	`started_at` text,
	`completed_at` text,
	`note` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `housekeeping_room_date_idx` ON `housekeeping_records` (`room_id`,`service_date`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`reservation_id` text,
	`company_id` text,
	`type` text NOT NULL,
	`amount_cents` integer NOT NULL,
	`effective_date` text NOT NULL,
	`status` text NOT NULL,
	`reference` text,
	`note` text,
	`recorded_by_employee_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recorded_by_employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `payments_reservation_idx` ON `payments` (`reservation_id`);--> statement-breakpoint
CREATE TABLE `properties` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`address_line_1` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`postal_code` text NOT NULL,
	`phone` text NOT NULL,
	`timezone` text NOT NULL,
	`room_count` integer NOT NULL,
	`check_in_time` text NOT NULL,
	`checkout_time` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `property_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `property_settings_property_key` ON `property_settings` (`property_id`,`key`);--> statement-breakpoint
CREATE TABLE `property_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`text` text NOT NULL,
	`area` text NOT NULL,
	`completed` integer NOT NULL,
	`completed_at` text,
	`created_by_employee_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by_employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `property_tasks_property_completed_idx` ON `property_tasks` (`property_id`,`completed`);--> statement-breakpoint
CREATE TABLE `reservation_charges` (
	`id` text PRIMARY KEY NOT NULL,
	`reservation_id` text NOT NULL,
	`type` text NOT NULL,
	`description` text NOT NULL,
	`service_date` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit_amount_cents` integer NOT NULL,
	`amount_cents` integer NOT NULL,
	`taxable` integer NOT NULL,
	`tax_amount_cents` integer NOT NULL,
	`status` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `reservation_charges_reservation_idx` ON `reservation_charges` (`reservation_id`);--> statement-breakpoint
CREATE TABLE `reservations` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`guest_id` text NOT NULL,
	`room_id` text,
	`room_type_id` text,
	`company_id` text,
	`confirmation_number` text NOT NULL,
	`source` text NOT NULL,
	`status` text NOT NULL,
	`arrival_date` text NOT NULL,
	`departure_date` text NOT NULL,
	`adult_count` integer NOT NULL,
	`child_count` integer NOT NULL,
	`room_rate_cents` integer NOT NULL,
	`payment_arrangement` text NOT NULL,
	`notes` text,
	`checked_in_at` text,
	`checked_out_at` text,
	`created_by_employee_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`guest_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_type_id`) REFERENCES `room_types`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by_employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `reservations_property_dates_idx` ON `reservations` (`property_id`,`arrival_date`,`departure_date`);--> statement-breakpoint
CREATE INDEX `reservations_room_dates_idx` ON `reservations` (`room_id`,`arrival_date`,`departure_date`);--> statement-breakpoint
CREATE INDEX `reservations_guest_idx` ON `reservations` (`guest_id`);--> statement-breakpoint
CREATE INDEX `reservations_status_idx` ON `reservations` (`status`);--> statement-breakpoint
CREATE TABLE `room_types` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`name` text NOT NULL,
	`short_label` text NOT NULL,
	`bed_description` text NOT NULL,
	`max_occupancy` integer NOT NULL,
	`base_rate_cents` integer NOT NULL,
	`active` integer NOT NULL,
	`sort_order` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `room_types_property_idx` ON `room_types` (`property_id`);--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`room_type_id` text NOT NULL,
	`number` text NOT NULL,
	`floor` integer NOT NULL,
	`section` text NOT NULL,
	`map_order` integer NOT NULL,
	`service_status` text NOT NULL,
	`housekeeping_status` text NOT NULL,
	`out_of_order_reason` text,
	`active` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_type_id`) REFERENCES `room_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_property_number_key` ON `rooms` (`property_id`,`number`);--> statement-breakpoint
CREATE INDEX `rooms_property_status_idx` ON `rooms` (`property_id`,`service_status`,`housekeeping_status`);--> statement-breakpoint
CREATE TABLE `time_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`clock_in_at` text NOT NULL,
	`clock_out_at` text,
	`break_minutes` integer NOT NULL,
	`status` text NOT NULL,
	`edit_reason` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `time_entries_employee_idx` ON `time_entries` (`employee_id`,`clock_in_at`);