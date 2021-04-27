import { Migration } from '@mikro-orm/migrations';

export class Migration20210427202448 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "provider" ("_id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "provider_name" text not null);');
  }

}
