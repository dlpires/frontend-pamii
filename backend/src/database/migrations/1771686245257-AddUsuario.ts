import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsuario1771686245257 implements MigrationInterface {
    name = 'AddUsuario1771686245257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`usuario\` varchar(255) NOT NULL, \`senha\` text NOT NULL, \`perfil\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
