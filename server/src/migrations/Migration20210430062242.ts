import { Migration } from '@mikro-orm/migrations';

export class Migration20210430062242 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "provider" ("_id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null default \'NOW()\', "provider_name" text not null, "slug" text not null);');

    this.addSql('create table "user" ("_id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null default \'NOW()\', "email" text not null, "contact_number" text null, "name" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_contact_number_unique" unique ("contact_number");');
  }

}
