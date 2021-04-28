import { Migration } from '@mikro-orm/migrations';

export class Migration20210428063024 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("_id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null default \'NOW()\', "username" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('alter table "provider" drop constraint if exists "provider_created_at_check";');
    this.addSql('alter table "provider" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "provider" alter column "created_at" set default \'NOW()\';');
    this.addSql('alter table "provider" drop constraint if exists "provider_updated_at_check";');
    this.addSql('alter table "provider" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "provider" alter column "updated_at" set default \'NOW()\';');
  }

}
