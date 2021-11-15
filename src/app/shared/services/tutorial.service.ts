import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { delay, tap, timeout } from 'rxjs/operators';
import { Comment, MainNavData, TaskData, TestData, TheoryData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  // public theoryData$: Subject<Array<TheoryData[]>> = new Subject<Array<TheoryData[]>>()
  // public testData$: Subject<TestData[]> = new Subject<TestData[]>()
  // public practiceData$: Subject<PracticeData[]> = new Subject<PracticeData[]>()

  constructor(private http: HttpClient) {}

  public getTutorialNameList(): Observable<string[]> {
    // return this.http.get('Adress')
    return of(['JavaScript', 'C#', 'Java', 'Ruby'])
  }

  public getTutorialMainNavData(tutorialName: string): Observable<MainNavData[]> {
    // return this.http.get(tutorialName)
    return of([{id: '1', sectionTitle: 'Вступ', chapters: [{chapterTitle: 'Введення в JavaScript', id: '11'}, {chapterTitle: 'Довідники та специфікації', id: '12'}, {chapterTitle: 'Редактори коду', id: '13'}, {chapterTitle: 'Консоль розробника', id: '14'}]}, {id: '2', sectionTitle: 'Oснови JavaScript', chapters: [{chapterTitle: 'Привіт світ!', id: '21'}, {chapterTitle: 'Структура кода', id: '22'}, {chapterTitle: 'Суворий режим - "use strict"', id: '23'}, {chapterTitle: 'змінні', id: '24'}, {chapterTitle: 'типи даних', id: '25'}, {chapterTitle: 'Взаємодія: попередження, запит, підтвердження', id: '26'}, {chapterTitle: 'перетворення типів', id: '27'}, {chapterTitle: 'Базові оператори, математика', id: '28'}, {chapterTitle: 'Оператори порівняння', id: '29'}, {chapterTitle: 'Умовне розгалуження: if, "?"', id: '291'}, {chapterTitle: 'Логічні оператори', id: '292'}, {chapterTitle: 'Оператор об\'єднання з null "??"', id: '293'}, {chapterTitle: 'Цикли while і for', id: '294'}, {chapterTitle: 'Конструкція «перемикач»', id: '295'}, {chapterTitle: 'функції', id: '296'}, {chapterTitle: 'Вираз функції', id: '297'}, {chapterTitle: 'Функції-стрілки, основи', id: '298'}, {chapterTitle: 'особливості JavaScript', id: '299'}]}])
  }

  public getTheorySectionData(tutorial: string, chapterId: string): Observable<Array<TheoryData[]>> {
    // return this.http.get('tutorial/chapterId/theory')
    
    return of([[{type: 'text', content: '<h2>Умовне розгалуження: <span class="highlight">if</span>, <span class="highlight">\'?\'</span></h2> <p>Іноді нам потрібно виконати різні дії в залежності від умов.</p><p>Для цього ми можемо використовувати інструкцію <span class="highlight">if</span> і умовний оператор <span class="highlight">?</span>, який також називають оператором «знак питання».</p>', id: 'someId'}], [{type: 'text', content: '<h2>Інструкція «if»</h2> <p>Інструкція <span class="highlight">if(...)</span> обчислює умову в дужках і, якщо результат <span class="highlight">true</span>, то виконує блок коду.</p> <p>наприклад:</p>', id: 'someId'}, {type: 'code', content: 'let year = prompt(\'В каком году была опубликована спецификация ECMAScript-2015?\', \'\'); \n if (year == 2015) alert( \'Вы правы!\' ); ', id: 'someId'}, {type: 'text', content: '<p>В наведеному вище прикладі, умова - це проста перевірка на рівність <span class="highlight">( year == 2015)</span>, але воно може бути і набагато більш складним.</p><p>Якщо ми хочемо виконати більше однієї інструкції, то потрібно укласти блок коду в фігурні дужки:</p>', id: 'someId'}, {type: 'code', content: 'if (year == 2015) { \n alert( "Правильно!" ); \n alert( "Вы такой умный!" ); \n}', id: 'someId'}, {type: 'text', content: '<p>Ми рекомендуємо використовувати фігурні дужки <span class="highlight">{ }</span> завжди, коли ви використовуєте інструкцію <span class="highlight">if</span>, навіть якщо виконується тільки одна команда. Це покращує читабельність коду.</p>', id: 'someId'}], [{type: 'text', content: '<h2>Перетворення до логічного типу</h2> <p>Інструкція <span class="highlight">if(...)</span> обчислює вираз в дужках і перетворює результат до логічного типу.</p><p>Давайте згадаємо правила перетворення типів з голови Перетворення типів :</p><ul><li><p>Число <span class="highlight">0</span>, порожній рядок <span class="highlight">""</span>, <span class="highlight">null</span>, <span class="highlight">undefined</span> і <span class="highlight">NaN</span> стають <span class="highlight">false</span>. Через це їх називають «помилковими» ( «falsy») значеннями.</li><li><p>Решта значення стають <span class="highlight">true</span>, тому їх називають «правдивими» ( «truthy»).</p></li></ul><p>Таким чином, код за такої умови ніколи не виконається:</p>', id: 'someId'}, {type: 'code', content: 'if (0) { // 0 is falsy \n ... \n}', id: 'someId'}, {type: 'text', content: '<p>... а при такому - виконається завжди:</p>', id: 'someId'}, {type: 'code', content: 'if (1) { // 1 is truthy \n ... \n}', id: 'someId'}, {type: 'text', content: '<p>Ми також можемо передати заздалегідь обчислена в змінної логічне значення в <span class="highlight">if</span>, наприклад так:</p>', id: 'someId'}, {type: 'code', content: 'let condition = (year == 2015); // преобразуется к true или false \n if (condition) {\n ... \n}', id: 'someId'}], [{type: 'text', content: '<h2>Блок «else»</h2> <p>Інструкція <span class="highlight">if</span> необов\'язковий блок «else» ( «інакше»).Він виконується, коли умова помилкова.</p><p>наприклад:</p>', id: 'someId'}, {type: 'code', content: 'let year = prompt(\'В каком году была опубликована спецификация ECMAScript-2015?\', \'\'); \n \n if (year == 2015) {\n alert( \'Да вы знаток!\' );\n} else {\n alert( \'А вот и неправильно!\' ); // любое значение, кроме 2015\n}', id: 'someId'}], [{type: 'text', content: '<h2>Кілька умов: «else if»</h2> <p>Іноді, потрібно перевірити кілька варіантів умови. Для цього використовується блок else if <span class="highlight">else if</span>.</p><p>наприклад:</p>', id: 'someId'}, {type: 'code', content: 'let year = prompt(\'В каком году была опубликована спецификация ECMAScript-2015?\', \'\');\n \n if (year < 2015) {\n alert( \'Это слишком рано...\' ); \n} else if (year > 2015) {\n alert( \'Это поздновато\' );\n} else {\n alert( \'Верно!\' );\n}', id: 'someId'}, {type: 'text', content: '<p>У наведеному вище коді JavaScript спочатку перевірить <span class="highlight">year < 2015</span>. Якщо це не так, він переходить до наступного умові year <span class="highlight">year > 2015</span>. Якщо воно теж помилково, тоді спрацює останній <span class="highlight">alert</span>.</p><p>Блоків <span class="highlight">else if</span> може бути і більше. Присутність блоку <span class="highlight">else</span> не є обов\'язковим.</p>', id: 'someId'}]])
      .pipe(delay(500), tap(() => {console.log('fetching theory data...')}))
    
  }
  
  public getTestsSectionData(tutorial: string, chapterId: string): Observable<TestData[]> {
    // return this.http.get('tutorial/chapterId/tests')

    return of([{id: '1', taskTitle: 'Що треба поставити замість _ , щоб оператор "if" виконав метод alert("Hello world") ?', taskCode: 'if _x > y_ _ \n alert("Hello World");\n_', answers: ['[ ] ( )', ') ( } {', '( ) { }', '( } { )'], rightAnswer: '( ) { }'}, {id: '2', taskTitle: 'Виправте вираз так щоб значення змінної х було більше у, а в іншому випадку виконався alert(Goodbye)', taskCode: '_ (x _ y) {\n alert("Hello World");\n } _ {\n alert("Goodbye");\n}', answers: ['if < else if', 'if > else', 'else < if', 'if < else'], rightAnswer: 'if > else'},{id: '3', taskTitle: 'Test title Test title Test title Test title', answers: ['aaaa', 'bbbb', 'cccc'], rightAnswer: 'cccc'}, {id: '4', taskTitle: 'Test title Test title Test title Test title', answers: ['mig', 'stels', 'raptor'], rightAnswer: 'stels'},{id: '5', taskTitle: 'Test title Test title Test title Test title', answers: ['aaaa', 'bbbb', 'cccc'], rightAnswer: 'cccc'}, {id: '6', taskTitle: 'Test title Test title Test title Test title', answers: ['mig', 'stels', 'raptor'], rightAnswer: 'stels'},{id: '7', taskTitle: 'Test title Test title Test title Test title', answers: ['aaaa', 'bbbb', 'cccc'], rightAnswer: 'cccc'}, {id: '8', taskTitle: 'Test title Test title Test title Test title', answers: ['mig', 'stels', 'raptor'], rightAnswer: 'stels'}])
      .pipe(delay(500), tap(() => {console.log('fetching test data...')}))
  }

  public getPracticeSectionData(tutorial: string, chapterId: string): Observable<TaskData[]> {
    // return this.http.get('tutorial/chapterId/practice')
    return of([
      {id: "1", taskText: "Зазвичай, коли ви щось купуєте, вас запитують, чи правильний номер вашої кредитної картки, номер телефону чи відповідь на ваше найпотаємніше запитання. Однак, оскільки хтось може дивитися вам через плече, ви не хочете, щоб це відображалося на екрані. Замість цього ми маскуємо його. Ваше завдання — написати функцію maskify, яка змінює всі символи, крім останніх чотирьох, на «#».", taskCode: 'function maskify(cc) {\n return maskifiedResult \n}', answerCode: '// return masked string \n function maskify(cc) { \n  if (cc.length < 5) { \n   return cc \n  } \n  let newCc = " " \n  for(let i = 0; i < cc.length - 4; i++) { \n   newCc += "#" \n  } \n  return newCc + cc.slice(cc.length - 4, cc.length) \n }'},
      {id: "2", taskText: "Usually111 when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it. Your task is to write a function maskify, which changes all but the last four characters into '#'.", taskCode: 'function maskify(cc) {\n return maskifiedResult \n}', answerCode: '// return masked string \n function maskify(cc) { \n if (cc.length < 5) { \n return cc \n } \n let newCc = " " \n for(let i = 0; i < cc.length - 4; i++) { \n newCc += "#" \n } \n return newCc + cc.slice(cc.length - 4, cc.length) \n}'},
      {id: "3", taskText: "Usually222 when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it. Your task is to write a function maskify, which changes all but the last four characters into '#'.", taskCode: 'function maskify(cc) {\n return maskifiedResult \n}', answerCode: '// return masked string \n function maskify(cc) { \n if (cc.length < 5) { \n return cc \n } \n let newCc = " " \n for(let i = 0; i < cc.length - 4; i++) { \n newCc += "#" \n } \n return newCc + cc.slice(cc.length - 4, cc.length) \n}'},
      {id: "4", taskText: "Usually333 when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it. Your task is to write a function maskify, which changes all but the last four characters into '#'.", taskCode: 'function maskify(cc) {\n return maskifiedResult \n}', answerCode: '// return masked string \n function maskify(cc) { \n if (cc.length < 5) { \n return cc \n } \n let newCc = " " \n for(let i = 0; i < cc.length - 4; i++) { \n newCc += "#" \n } \n return newCc + cc.slice(cc.length - 4, cc.length) \n}'},
      {id: "5", taskText: "Usually444 when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, we mask it. Your task is to write a function maskify, which changes all but the last four characters into '#'.", taskCode: 'function maskify(cc) {\n return maskifiedResult \n}', answerCode: '// return masked string \n function maskify(cc) { \n if (cc.length < 5) { \n return cc \n } \n let newCc = " " \n for(let i = 0; i < cc.length - 4; i++) { \n newCc += "#" \n } \n return newCc + cc.slice(cc.length - 4, cc.length) \n}'}
    ])
    .pipe(delay(500), tap(() => {console.log('fetching practice...')}))
  }

  public getCommentsBlockData(taskId: string): Observable<Comment[]> {
    //http request here
    return of([
      {id: '1', userData: {img: 'https://material.angular.io/assets/img/examples/shiba1.jpg', nickName: 'Alexandr'},  title: 'Навіщо в класі директиви Input-властивостей надавати значення?', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia expedita voluptates exercitationem recusandae adipisci a quo optio facilis perspiciatis. Culpa quae pariatur corporis modi, nisi doloribus. Et, laudantium quia sed quidem a eveniet consequuntur ad aut quaerat. Repellendus architecto deserunt voluptatibus quod expedita sequi quas explicabo, molestiae cum? Dicta, inventore.', likes: 3, dislikes: 1},
      {id: '2', userData: {img: 'https://www.rabbitvideos.com/wp-content/uploads/2019/09/1569163262_hqdefault.jpg', nickName: 'Alex'}, title: 'Видається повідомлення про помилку: " error TS:2339 Property "controls" does not', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia expedita voluptates exercitationem recusandae adipisci a quo optio facilis perspiciatis. Culpa quae pariatur corporis modi, nisi doloribus. Et, laudantium quia sed quidem a eveniet consequuntur ad aut quaerat. Repellendus architecto deserunt voluptatibus quod expedita sequi quas explicabo, molestiae cum? Dicta, inventore.' , likes: 2, dislikes: 0},
      {id: '3', userData: {img: 'https://irecommend.ru/sites/default/files/product-images/61229/CNY6zkOwTgvAiptklIEgsA.jpg', nickName: 'Barbie'}, title: 'tap(this.setToken)', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia expedita voluptates exercitationem recusandae adipisci a quo optio facilis perspiciatis. Culpa quae pariatur corporis modi, nisi doloribus. Et, laudantium quia sed quidem a eveniet consequuntur ad aut quaerat. Repellendus architecto deserunt voluptatibus quod expedita sequi quas explicabo, molestiae cum? Dicta, inventore.' , likes: 5, dislikes: 2},
      {id: '4', userData: {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bald_Eagle_Portrait.jpg/819px-Bald_Eagle_Portrait.jpg', nickName: 'Jhonny'}, title: 'Розкажіть як працює односторонній байдинг під капотом з точки зору', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia expedita voluptates exercitationem recusandae adipisci a quo optio facilis perspiciatis. Culpa quae pariatur corporis modi, nisi doloribus. Et, laudantium quia sed quidem a eveniet consequuntur ad aut quaerat. Repellendus architecto deserunt voluptatibus quod expedita sequi quas explicabo, molestiae cum? Dicta, inventore.', likes: 10, dislikes: 3}
    ]).pipe(delay(5500))
  }

  public checkTaskAnswer(taskId: string, taskCode: string): Observable<boolean> {
    // request

    //temp 
    const result = !Math.round(Math.random())
    return of(result).pipe(delay(1500))
  }
}
