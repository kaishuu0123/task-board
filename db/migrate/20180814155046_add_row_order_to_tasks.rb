class AddRowOrderToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :row_order, :integer
  end
end
