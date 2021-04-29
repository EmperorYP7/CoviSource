import { Migration } from '@mikro-orm/migrations';

export class Migration20210429194413 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "provider" drop constraint if exists "provider_created_at_check";');
    this.addSql('alter table "provider" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "provider" alter column "created_at" set default \'NOW()\';');
    this.addSql('alter table "provider" drop constraint if exists "provider_updated_at_check";');
    this.addSql('alter table "provider" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "provider" alter column "updated_at" set default \'NOW()\';');

    this.addSql('alter table "user" rename column "username" to "email";');


    this.addSql('alter table "user" add column "contact_number" text null, add column "name" text not null;');
    this.addSql('alter table "user" drop constraint if exists "user_created_at_check";');
    this.addSql('alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "created_at" set default \'NOW()\';');
    this.addSql('alter table "user" drop constraint if exists "user_updated_at_check";');
    this.addSql('alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "updated_at" set default \'NOW()\';');

    this.addSql('alter table "user" drop constraint "user_username_unique";');
  }

}
