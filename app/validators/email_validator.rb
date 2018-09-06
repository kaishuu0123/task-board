require 'mail'

class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    begin
      m = Mail::Address.new(value)
      r = m.domain != nil && m.domain.match('\.') && m.address == value
    rescue => exception
      r = false
    end

    record.errors[attribute] << (options[:message] || "is invalid") unless r

    record.errors[attribute] << 'must be given. Please give us a real email address.' unless value !~ User::DEFAULT_EMAIL_REGEX
  end
end