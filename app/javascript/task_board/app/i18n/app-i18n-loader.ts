import {TranslateLoader} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export class AppI18nLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const langList = {
      "en": {
        "open": "Open",
        "in_progress": "In Progress",
        "done": "Done",
        "createProject": "Create Project",
        "createTask": "Create Task",
        "newTask": "New Task",
        "updateTask": "Update Task",
        "newProject": "New Project",
        "updateProject": "Update Project",
        "title": "Title",
        "description": "Description",
        "name": "Name",
        "login": "Login",
        "logout": "Logout",
        "email": "Email address",
        "password": "Password",
        "registration": "Registration",
        "passwordConfirmation": "Password Confirmation",
        "pleaseInputEmail": "Please input Email",
        "notValidEmail": "Not a valid Email",
        "pleaseInputPassword": "Please input password.",
        "incorrectPassword": "Incorrect password",
        "incorrectEmailOrPassword": "Incorrect Email or Password",
        "pleaseLogin": "Please Login"
      },
      "ja": {
        "open": "新規",
        "in_progress": "進行中",
        "done": "完了",
        "createProject": "プロジェクトを作成",
        "createTask": "タスクを作成",
        "newTask": "新規タスクを作成",
        "updateTask": "タスクを更新",
        "newProject": "新規プロジェクト",
        "updateProject": "プロジェクトを更新",
        "title": "タイトル",
        "description": "説明",
        "name": "名前",
        "login": "ログイン",
        "logout": "ログアウト",
        "email": "メールアドレス",
        "password": "パスワード",
        "registration": "新規登録",
        "passwordConfirmation": "パスワード確認",
        "pleaseInputEmail": "メールアドレスを入力してください",
        "notValidEmail": "メールアドレスの形式が正しくありません",
        "pleaseInputPassword": "パスワードを入力してください",
        "incorrectPassword": "パスワードが間違っています",
        "incorrectEmailOrPassword": "メールアドレスかパスワードが間違っています",
        "pleaseLogin": "ログインしてください"
      }
    };
    return of(langList[lang]);
  }
}