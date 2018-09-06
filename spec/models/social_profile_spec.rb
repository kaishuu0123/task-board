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

require 'rails_helper'

RSpec.describe SocialProfile, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
