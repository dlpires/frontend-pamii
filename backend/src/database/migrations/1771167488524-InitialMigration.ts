import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1771167488524 implements MigrationInterface {
    name = 'InitialMigration1771167488524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mesas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`qtd_cadeiras\` int NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comandas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_mesa\` int NOT NULL, \`obs_comanda\` varchar(100) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comandasItens\` (\`id_comanda\` int NOT NULL, \`id_produto\` int NOT NULL, \`qtd_item\` float NOT NULL, \`valor_venda\` decimal(10,2) NOT NULL, \`statusPg\` tinyint NOT NULL DEFAULT 0, \`statusEntrega\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id_comanda\`, \`id_produto\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`produtos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dsc_produto\` varchar(100) NOT NULL, \`valor_unit\` float NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comandas\` ADD CONSTRAINT \`FK_30c16c1c05e589ab0bbd3a3b1b6\` FOREIGN KEY (\`id_mesa\`) REFERENCES \`mesas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comandasItens\` ADD CONSTRAINT \`FK_a3f04b27ff9676cec9a5c97047a\` FOREIGN KEY (\`id_comanda\`) REFERENCES \`comandas\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comandasItens\` ADD CONSTRAINT \`FK_caeefcb3ed8e83bb6f0bc572840\` FOREIGN KEY (\`id_produto\`) REFERENCES \`produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comandasItens\` DROP FOREIGN KEY \`FK_caeefcb3ed8e83bb6f0bc572840\``);
        await queryRunner.query(`ALTER TABLE \`comandasItens\` DROP FOREIGN KEY \`FK_a3f04b27ff9676cec9a5c97047a\``);
        await queryRunner.query(`ALTER TABLE \`comandas\` DROP FOREIGN KEY \`FK_30c16c1c05e589ab0bbd3a3b1b6\``);
        await queryRunner.query(`DROP TABLE \`produtos\``);
        await queryRunner.query(`DROP TABLE \`comandasItens\``);
        await queryRunner.query(`DROP TABLE \`comandas\``);
        await queryRunner.query(`DROP TABLE \`mesas\``);
    }

}
