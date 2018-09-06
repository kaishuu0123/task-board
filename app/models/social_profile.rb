# == Schema Information
#
# Table name: social_profiles
#
#  id          :integer          not null, primary key
#  credentials :text
#  description :string
#  email       :string
#  image_url   :string
#  name        :string
#  nickname    :string
#  others      :text
#  provider    :string
#  raw_info    :text
#  uid         :string
#  url         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer
#
# Indexes
#
#  index_social_profiles_on_provider_and_uid  (provider,uid) UNIQUE
#  index_social_profiles_on_user_id           (user_id)
#

class SocialProfile < ApplicationRecord
  belongs_to :user
  store :others

  validates_uniqueness_of :uid, scope: :provider

  def self.find_for_oauth(auth)
    profile = find_or_create_by(uid: auth.uid, provider: auth.provider)
    profile.save_oauth_data!(auth)
    profile
  end

  def save_oauth_data!(auth)
    return unless valid_oauth?(auth)

    provider = auth["provider"]
    policy = policy(provider, auth)

    self.update_attributes(
      uid: policy.uid,
      name: policy.name,
      nickname: policy.nickname,
      email: policy.email,
      url: policy.url,
      image_url: policy.image_url,
      description: policy.description,
      credentials: policy.credentials,
      raw_info: policy.raw_info
    )
  end

  private

  def policy(provider, auth)
    class_name = "#{provider}".classify
    "OAuthPolicy::#{class_name}".constantize.new(auth)
  end

  def valid_oauth?(auth)
    (provider.to_s == auth['provider'].to_s) && (uid == auth['uid'])
  end
end
