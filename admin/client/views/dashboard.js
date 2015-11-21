import React from 'react';
import Layout from './layout';
import PageHeader from './components/page_header';

export default class Dashboard extends Layout {
  title() {
    return `${this.lang.brand.name} | ${this.lang.titles.welcome}`;
  }

  renderPartial() {
    return (
      <div>
        <PageHeader>{this.lang.titles.welcome}</PageHeader>
        <div className='p-w-news'>
          <div className='m-news'>
            <div className='card'>
              <div className='card-content'>
                <span className='card-title deep-orange-text text-darken-2'>Важная новость</span>
                <p>Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты.</p>
              </div>
              <div className='card-action'>
                <a href='#'>Подробнее</a>
              </div>
            </div>
            <div className='card'>
              <div className='card-content'>
                <span className='card-title deep-orange-text text-darken-2'>Важная новость</span>
                <p>Задача организации, в особенности же новая модель организационной деятельности требуют определения и уточнения форм развития. Повседневная практика показывает, что сложившаяся структура организации позволяет выполнять важные задания по разработке соответствующий условий активизации. Товарищи!</p>
              </div>
              <div className='card-action'>
                <a href='#'>Подробнее</a>
              </div>
            </div>
            <div className='card'>
              <div className='card-content'>
                <span className='card-title deep-orange-text text-darken-2'>Важная новость</span>
                <p>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни.</p>
              </div>
              <div className='card-action'>
                <a href='#'>Подробнее</a>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}
