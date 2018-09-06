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

FactoryBot.define do
  factory :social_profile do
    user nil
    provider "MyString"
    uid "MyString"
    name "MyString"
    nickname "MyString"
    email "MyString"
    url "MyString"
    image_url "MyString"
    description "MyString"
    others "MyText"
    credentials "MyText"
    raw_infor "MyText"
  end
end
