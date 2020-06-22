import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrudCreation1592547226031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `drop database if exists crud;
create database crud;

use crud;

create table track(
	id varchar(36) primary key,
    name varchar(50),
    artist varchar(50),
    length float
);

select * from track;

create table user(
	id varchar(36) primary key,
    username varchar(50),
    password varchar(255)
);

select * from user;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop database if exists crud;`);
  }
}
