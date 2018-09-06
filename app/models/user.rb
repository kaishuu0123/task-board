# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  jti                    :string           not null
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  unconfirmed_email      :string
#  username               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :social_profiles, dependent: :destroy

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
        #  :confirmable,
         :omniauthable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :projects

  DEFAULT_EMAIL_PEREFIX = 'changeme@example.com'
  DEFAULT_EMAIL_REGEX = /\Achangeme@example.com/

  validates :email, presence: true, email: true

  def social_profile(provider)
    social_profiles.select { |sp| sp.provider == provider.to_s }.first
  end

  def email_verified?
    email && email !~ DEFAULT_EMAIL_REGEX
  end

  def reset_confirmation!
    update_column(:confirmed_at, nil)
  end

  def self.current_user=(user)
    Thread.current[:current_user] = user
  end

  def self.current_user
    Thread.current[:current_user]
  end
end
