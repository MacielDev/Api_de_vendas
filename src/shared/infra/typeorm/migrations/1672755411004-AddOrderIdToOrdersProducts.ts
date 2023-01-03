import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddOrderIdToOrdersProducts1672755411004
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products', //Tabela
      new TableColumn({
        name: 'order_id', // Nome da nova coluna
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'ordersProductsOrder', //"apelido" da chave estrangeira
        columnNames: ['order_id'], // qual coluna de "orders_products" será a chave estrangeira
        referencedTableName: 'orders', // Qual tabela que está sendo referênciada por essa chave estrangeira
        referencedColumnNames: ['id'], // Qual campo da tabela referênciada é refletido na chave estrangeira
        onDelete: 'SET NULL', // Ao apagarmos um registro da tabela "orders" a order terá valor null  no Id da order
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'ordersProductsOrder');
    await queryRunner.dropColumn('orders_products', 'order_id');
  }
}
