# Task Board

Tiny Task Management System (hobby project)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Demo

https://kaishuu0123-task-board.herokuapp.com/#/

![TaskBoardDemo](https://github.com/kaishuu0123/task-board/blob/master/demo/demo.gif)


## How to setup

```shell
$ bundle install --path=vendor/bundle --binstubs=.bundle/bin
```

```shell
$ bundle exec rails db:create
$ bundle exec rails db:migrate
```

(for development)

```shell
$ ./bin/rails s
$ ./bin/webpack-dev-server
```

(for production)

```shell
$ RAILS_ENV=production bundle exec rails assets:precompile
$ RAILS_ENV=production bundle exec rails webpacker:compile
$ RAILS_ENV=production bundle exec rails s
```

## For developer

Internal Structure

* backend
    * Ruby version
        * 2.5.1
    * Rails 5 API mode
    * devise + devise-jwt

* frontend
    * Angular6
    * kutlugsahin/ngx-smooth-dnd
    * auth0/angular2-jwt
    * bootstrap 4
