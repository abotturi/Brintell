import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1665331509171 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {        
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "CPF",
                        type: "varchar",
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "sex",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "telephone",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
