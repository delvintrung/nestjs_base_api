import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToTour1760592694253 implements MigrationInterface {
    name = 'AddDescriptionToTour1760592694253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tour\` ADD \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tour\` DROP COLUMN \`description\``);
    }

}
