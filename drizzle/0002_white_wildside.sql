CREATE TABLE `guest_payment_sources` (
	`id` text PRIMARY KEY NOT NULL,
	`guest_id` text NOT NULL,
	`label` text NOT NULL,
	`last4` text,
	`token_reference` text NOT NULL,
	`expiration_month` text,
	`expiration_year` text,
	`note` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`guest_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `guest_payment_sources_guest_idx` ON `guest_payment_sources` (`guest_id`);--> statement-breakpoint
CREATE TABLE `guest_vehicles` (
	`id` text PRIMARY KEY NOT NULL,
	`guest_id` text NOT NULL,
	`plate` text NOT NULL,
	`make` text,
	`color` text,
	`year` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`guest_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `guest_vehicles_guest_idx` ON `guest_vehicles` (`guest_id`);--> statement-breakpoint
CREATE TABLE `reservation_extra_guests` (
	`id` text PRIMARY KEY NOT NULL,
	`reservation_id` text NOT NULL,
	`guest_id` text,
	`name` text NOT NULL,
	`driver_license_number` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`guest_id`) REFERENCES `guests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `reservation_extra_guests_reservation_idx` ON `reservation_extra_guests` (`reservation_id`);--> statement-breakpoint
CREATE TABLE `reservation_signatures` (
	`id` text PRIMARY KEY NOT NULL,
	`reservation_id` text NOT NULL,
	`signed_name` text NOT NULL,
	`terms_version` text NOT NULL,
	`accepted_at` text NOT NULL,
	FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `reservation_signatures_reservation_idx` ON `reservation_signatures` (`reservation_id`);--> statement-breakpoint
ALTER TABLE `guests` ADD `id_type` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `driver_license_number` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `driver_license_normalized` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `date_of_birth` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `id_expires` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `address_line_1` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `postal_code` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `state` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `country` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `country_code` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `secondary_phone` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `secondary_email` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `dnr_code` text;--> statement-breakpoint
ALTER TABLE `guests` ADD `dnr_remarks` text;--> statement-breakpoint
CREATE UNIQUE INDEX `guests_property_license_key` ON `guests` (`property_id`,`driver_license_normalized`);--> statement-breakpoint
ALTER TABLE `reservations` ADD `rate_code` text;--> statement-breakpoint
ALTER TABLE `reservations` ADD `pet_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `reservations` ADD `service_pet_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `reservations` ADD `booking_remarks` text;--> statement-breakpoint
ALTER TABLE `reservations` ADD `stay_remarks` text;--> statement-breakpoint
ALTER TABLE `reservations` ADD `housekeeping_remarks` text;--> statement-breakpoint
ALTER TABLE `reservations` ADD `other_remarks` text;