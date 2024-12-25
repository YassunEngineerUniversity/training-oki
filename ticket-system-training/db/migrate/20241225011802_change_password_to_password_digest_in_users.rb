class ChangePasswordToPasswordDigestInUsers < ActiveRecord::Migration[7.2]
  def change
    # password カラムを削除
    remove_column :users, :password, :string

    # password_digest カラムを追加
    add_column :users, :password_digest, :string
  end
end
