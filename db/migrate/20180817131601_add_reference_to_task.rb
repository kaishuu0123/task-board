class AddReferenceToTask < ActiveRecord::Migration[5.1]
  def change
    add_reference :tasks, :project, index: true
  end
end
