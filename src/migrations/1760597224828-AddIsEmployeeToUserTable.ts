import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsEmployeeToUserTable1760597224828 implements MigrationInterface {
    name = 'AddIsEmployeeToUserTable1760597224828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isEmployee\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isEmployee\``);
    }

}
