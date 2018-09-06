class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.string :description, default: ''

      t.timestamps
    end

    add_reference :projects, :user, index: true
  end
end
