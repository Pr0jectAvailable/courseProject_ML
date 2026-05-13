// выбран данный вариант реализации т к по другому импортировать нельзя
// билеты
const ticketsXML = [
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Минск</from>
    <to>Гомель</to>
    <date>2026-05-20</date>
    <time>09:15</time>
    <platform>Минск-Пассажирский, платформа 3</platform>
    <company>БЧ</company>
    <price>24.50</price>
    <rating>4.8</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Минск</from>
    <to>Брест</to>
    <date>2026-05-20</date>
    <time>11:30</time>
    <platform>Минск-Пассажирский, платформа 1</platform>
    <company>БЧ</company>
    <price>28.90</price>
    <rating>4.6</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Гомель</from>
    <to>Минск</to>
    <date>2026-05-21</date>
    <time>07:45</time>
    <platform>Гомель-Пассажирский</platform>
    <company>БЧ</company>
    <price>25.00</price>
    <rating>4.7</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Витебск</from>
    <to>Могилёв</to>
    <date>2026-05-22</date>
    <time>14:20</time>
    <platform>Витебский вокзал</platform>
    <company>БЧ Express</company>
    <price>18.30</price>
    <rating>4.5</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Гродно</from>
    <to>Минск</to>
    <date>2026-05-23</date>
    <time>16:00</time>
    <platform>Гродно-Центральный</platform>
    <company>БЧ</company>
    <price>22.70</price>
    <rating>4.9</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Брест</from>
    <to>Минск</to>
    <date>2026-05-24</date>
    <time>06:10</time>
    <platform>Брест-Центральный</platform>
    <company>БЧ</company>
    <price>27.40</price>
    <rating>4.4</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Могилёв</from>
    <to>Витебск</to>
    <date>2026-05-25</date>
    <time>18:55</time>
    <platform>Могилёв-1</platform>
    <company>БЧ</company>
    <price>19.10</price>
    <rating>4.3</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Бобруйск</from>
    <to>Минск</to>
    <date>2026-05-26</date>
    <time>12:25</time>
    <platform>Бобруйский вокзал</platform>
    <company>БЧ</company>
    <price>15.60</price>
    <rating>4.2</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Минск</from>
    <to>Гродно</to>
    <date>2026-05-27</date>
    <time>08:05</time>
    <platform>Минск-Пассажирский, платформа 5</platform>
    <company>БЧ Интерсити</company>
    <price>31.20</price>
    <rating>4.9</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Гомель</from>
    <to>Брест</to>
    <date>2026-05-28</date>
    <time>13:40</time>
    <platform>Гомель-Пассажирский</platform>
    <company>БЧ</company>
    <price>38.50</price>
    <rating>4.6</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Витебск</from>
    <to>Минск</to>
    <date>2026-05-29</date>
    <time>19:15</time>
    <platform>Витебский вокзал</platform>
    <company>БЧ</company>
    <price>23.40</price>
    <rating>4.4</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Могилёв</from>
    <to>Гомель</to>
    <date>2026-05-30</date>
    <time>10:30</time>
    <platform>Могилёв-1</platform>
    <company>БЧ</company>
    <price>20.80</price>
    <rating>4.3</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Минск</from>
    <to>Бобруйск</to>
    <date>2026-06-01</date>
    <time>07:20</time>
    <platform>Минск-Пассажирский, платформа 2</platform>
    <company>БЧ</company>
    <price>14.30</price>
    <rating>4.1</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Гродно</from>
    <to>Брест</to>
    <date>2026-06-02</date>
    <time>15:10</time>
    <platform>Гродно-Центральный</platform>
    <company>БЧ</company>
    <price>25.50</price>
    <rating>4.5</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Минск</from>
    <to>Витебск</to>
    <date>2026-06-03</date>
    <time>08:50</time>
    <platform>Минск-Пассажирский, платформа 4</platform>
    <company>БЧ</company>
    <price>21.90</price>
    <rating>4.7</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Минск</from>
    <to>Могилёв</to>
    <date>2026-06-04</date>
    <time>13:25</time>
    <platform>Минск-Пассажирский, платформа 6</platform>
    <company>БЧ</company>
    <price>19.40</price>
    <rating>4.5</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Брест</from>
    <to>Гродно</to>
    <date>2026-06-05</date>
    <time>09:10</time>
    <platform>Брест-Центральный</platform>
    <company>БЧ</company>
    <price>26.70</price>
    <rating>4.6</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Гомель</from>
    <to>Могилёв</to>
    <date>2026-06-06</date>
    <time>17:30</time>
    <platform>Гомель-Пассажирский</platform>
    <company>БЧ</company>
    <price>22.30</price>
    <rating>4.3</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Витебск</from>
    <to>Гродно</to>
    <date>2026-06-07</date>
    <time>06:40</time>
    <platform>Витебский вокзал</platform>
    <company>БЧ Интерсити</company>
    <price>34.20</price>
    <rating>4.8</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Бобруйск</from>
    <to>Гомель</to>
    <date>2026-06-08</date>
    <time>11:05</time>
    <platform>Бобруйский вокзал</platform>
    <company>БЧ</company>
    <price>16.80</price>
    <rating>4.0</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Минск</from>
    <to>Жлобин</to>
    <date>2026-06-09</date>
    <time>14:15</time>
    <platform>Минск-Пассажирский, платформа 7</platform>
    <company>БЧ</company>
    <price>17.50</price>
    <rating>4.2</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Гродно</from>
    <to>Минск</to>
    <date>2026-06-10</date>
    <time>19:45</time>
    <platform>Гродно-Центральный</platform>
    <company>БЧ</company>
    <price>22.70</price>
    <rating>4.9</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Могилёв</from>
    <to>Минск</to>
    <date>2026-06-11</date>
    <time>12:20</time>
    <platform>Могилёв-1</platform>
    <company>БЧ</company>
    <price>19.40</price>
    <rating>4.6</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Витебск</from>
    <to>Бобруйск</to>
    <date>2026-06-12</date>
    <time>15:50</time>
    <platform>Витебский вокзал</platform>
    <company>БЧ</company>
    <price>24.60</price>
    <rating>4.3</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Брест</from>
    <to>Гомель</to>
    <date>2026-06-13</date>
    <time>10:00</time>
    <platform>Брест-Центральный</platform>
    <company>БЧ</company>
    <price>36.20</price>
    <rating>4.5</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Минск</from>
    <to>Пинск</to>
    <date>2026-06-14</date>
    <time>07:35</time>
    <platform>Минск-Пассажирский, платформа 2</platform>
    <company>БЧ</company>
    <price>28.10</price>
    <rating>4.4</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Гродно</from>
    <to>Витебск</to>
    <date>2026-06-15</date>
    <time>16:25</time>
    <platform>Гродно-Центральный</platform>
    <company>БЧ</company>
    <price>32.80</price>
    <rating>4.7</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Минск</from>
    <to>Орша</to>
    <date>2026-06-16</date>
    <time>18:20</time>
    <platform>Минск-Пассажирский, платформа 8</platform>
    <company>БЧ</company>
    <price>20.40</price>
    <rating>4.3</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Гомель</from>
    <to>Витебск</to>
    <date>2026-06-17</date>
    <time>09:55</time>
    <platform>Гомель-Пассажирский</platform>
    <company>БЧ Интерсити</company>
    <price>35.60</price>
    <rating>4.7</rating>
</ticket>`,
    `<?xml version="1.0" encoding="UTF-8"?>
<ticket>
    <from>Брест</from>
    <to>Могилёв</to>
    <date>2026-06-18</date>
    <time>14:45</time>
    <platform>Брест-Центральный</platform>
    <company>БЧ</company>
    <price>32.10</price>
    <rating>4.5</rating>
</ticket>`
];