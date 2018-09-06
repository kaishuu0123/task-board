class AddUsernameToUser < ActiveRecord::Migration[5.1]
  def up
    add_column :users, :username, :string
  end

  def down
    remove_column :users, :username
  end
end
