class CreateExpressions < ActiveRecord::Migration[6.1]
  def change
    create_table :expressions do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :visible, null: false, default: false
      t.references :author, foreign_key: { to_table: 'users' }

      t.timestamps
    end
  end
end
