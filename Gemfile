source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.6'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

gem "ranked-model", "~> 0.4.0"

gem "devise", "~> 4.4.0"
gem "devise-jwt", "~> 0.5.7"

gem "omniauth", "~> 1.8.0"
gem "omniauth-twitter", "~> 1.4.0"

gem "config"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]

  # Use Pry as your rails console (https://github.com/rweng/pry-rails)
  gem 'pry-rails'
  # Fast debugging with Pry. (https://github.com/deivid-rodriguez/pry-byebug)
  gem 'pry-byebug'
  # Walk the stack in a Pry session (https://github.com/pry/pry-stack_explorer)
  gem 'pry-stack_explorer'
  # Pretty print Ruby objects with proper indentation and colors (https://github.com/awesome-print/awesome_print)
  gem 'awesome_print'

  # RSpec for Rails (https://github.com/rspec/rspec-rails)
  gem 'rspec-rails'
  # factory_bot_rails provides integration between factory_bot and rails 3 or newer (http://github.com/thoughtbot/factory_bot_rails)
  gem 'factory_bot_rails'

  # Automatic Ruby code style checking tool. (https://github.com/rubocop-hq/rubocop)
  gem 'rubocop', require: false

  gem 'dotenv-rails'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # Add comments to your Gemfile with each dependency's description. (https://github.com/ivantsepp/annotate_gem)
  gem 'annotate_gem', require: false
  # Annotates Rails Models, routes, fixtures, and others based on the database schema. (http://github.com/ctran/annotate_models)
  gem 'annotate', require: false

  gem "letter_opener"

  gem "solargraph"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
