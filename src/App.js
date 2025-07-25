import React, { useState, useEffect } from 'react';
import './App.css';

const LANGUAGES = [
  { code: 'EN', label: '🇬🇧' },
  { code: 'AL', label: '🇦🇱' },
  { code: 'DE', label: '🇩🇪' },
  { code: 'IT', label: '🇮🇹' },
  { code: 'ZH', label: '🇨🇳' },
];

const convertToEuro = (lek) => {
  const numeric = parseFloat(lek.replace(/[^\d.]/g, ''));
  if (isNaN(numeric)) return '';
  return `€${(numeric / 100).toFixed(2)}`;
};

const MENU_ITEMS = {
  EN: {
    '🥣 Soups of the Day': [
      { name: 'Beef Soup', desc: '', price: '450 LEK' },
      { name: 'Fish Soup', desc: '', price: '450 LEK' },
      { name: 'Vegetable Soup', desc: '', price: '350 LEK' },
    ],
    '🥗 Salads': [
      { name: 'Shpresa Salad', desc: '', price: '600 LEK' },
      { name: 'Delicacy Salad', desc: '', price: '550 LEK' },
      { name: 'Shrimp Caesar', desc: '', price: '600 LEK' },
      { name: 'Chicken Caesar', desc: '', price: '500 LEK' },
      { name: 'Rucola', desc: '', price: '500 LEK' },
      { name: 'Greek Salad', desc: '', price: '450 LEK' },
      { name: 'Village Salad', desc: '', price: '400 LEK' },
      { name: 'Green Salad', desc: '', price: '350 LEK' },
    ],
    '❄️ Cold Antipasti': [
      { name: 'Classic Bruschetta', desc: '', price: '250 LEK' },
      { name: 'Olive Bruschetta', desc: '', price: '300 LEK' },
      { name: 'Beef Tartare', desc: '', price: '650 LEK' },
      { name: 'Salmon Tartare', desc: '', price: '800 LEK' },
      { name: 'Seabass Carpaccio', desc: '', price: '1100 LEK' },
      { name: 'Raw Shrimp', desc: '', price: '2000 LEK' },
      { name: 'Gravlax Salmon', desc: '', price: '1000 LEK' },
      { name: 'Marinated Octopus', desc: '', price: '1200 LEK' },
      { name: 'Grilled Zucchini', desc: '', price: '350 LEK' },
      { name: 'Homemade Prosciutto', desc: '', price: '800 LEK' },
      { name: 'Beef Roast with Tuna Sauce', desc: '', price: '900 LEK' },
      { name: 'Raw Scampi', desc: '', price: '3000 LEK' },
    ],
    '🔥 Warm Antipasti': [
      { name: 'Baked Cheese', desc: '', price: '450 LEK' },
      { name: 'Homemade Meatballs', desc: '', price: '550 LEK' },
      { name: 'Sautéed Mushrooms', desc: '', price: '300 LEK' },
      { name: 'Spring Rolls', desc: '', price: '400 LEK' },
      { name: 'Grilled Shrimp', desc: '', price: '1000 LEK' },
      { name: 'Mixed Fritters', desc: '', price: '1200 LEK' },
      { name: 'Shrimp Casserole', desc: '', price: '1100 LEK' },
      { name: 'Spicy Octopus', desc: '', price: '1100 LEK' },
      { name: 'Calamari & Beans', desc: '', price: '1100 LEK' },
    ],
    '🍝 Pasta': [
      { name: 'Seafood Linguine', desc: '', price: '800 LEK' },
      { name: 'Shrimp Linguine', desc: '', price: '800 LEK' },
      { name: 'Shrimp Paccheri', desc: '', price: '900 LEK' },
      { name: 'Tagliatelle with Meat', desc: '', price: '600 LEK' },
      { name: 'Bolognese Penne', desc: '', price: '600 LEK' },
      { name: 'Spaghetti with Tomato', desc: '', price: '500 LEK' },
      { name: 'Spaghetti with Pesto & Burrata', desc: '', price: '800 LEK' },
    ],
    '🍚 Risotto': [
      { name: 'Vegetable Risotto', desc: '', price: '450 LEK' },
      { name: 'Spinach Risotto', desc: '', price: '500 LEK' },
      { name: 'Truffle Risotto', desc: '', price: '600 LEK' },
      { name: 'Meat Risotto', desc: '', price: '600 LEK' },
      { name: 'Shrimp Risotto', desc: '', price: '800 LEK' },
      { name: 'Seafood Risotto', desc: '', price: '800 LEK' },
    ],
    '🐟 Fish': [
      { name: 'Fish Fillet', desc: '', price: '1100 LEK' },
      { name: 'Grilled Salmon', desc: '', price: '1100 LEK' },
      { name: 'Grilled Octopus', desc: '', price: '1200 LEK' },
    ],
    '🥩 Meat': [
      { name: 'Chicken Fillet', desc: '', price: '800 LEK' },
      { name: 'Grilled Beefsteak', desc: '', price: '1000 LEK' },
      { name: 'Beef Chop', desc: '', price: '1000 LEK' },
      { name: 'Beef Ribs', desc: '', price: '1100 LEK' },
      { name: 'Beef Tenderloin', desc: '', price: '1500 LEK' },
    ],
    '🍰 Desserts': [
      { name: 'Soufflé with Ice Cream', desc: '', price: '450 LEK' },
      { name: 'Cheesecake', desc: '', price: '400 LEK' },
      { name: 'Tiramisu', desc: '', price: '300 LEK' },
    ],
  },


  AL: {
    '🥣 Supat e Ditës': [
      { name: 'Supë viçi', desc: '', price: '450 LEK' },
      { name: 'Supë peshku', desc: '', price: '450 LEK' },
      { name: 'Supë perimesh', desc: '', price: '350 LEK' },
    ],
    '🥗 Sallata': [
      { name: 'Sallatë Shpresa', desc: '', price: '600 LEK' },
      { name: 'Sallatë Delikatesa', desc: '', price: '550 LEK' },
      { name: 'Cezar me karkalec', desc: '', price: '600 LEK' },
      { name: 'Cezar me pulë', desc: '', price: '500 LEK' },
      { name: 'Rukola', desc: '', price: '500 LEK' },
      { name: 'Greke', desc: '', price: '450 LEK' },
      { name: 'Sallatë Fshati', desc: '', price: '400 LEK' },
      { name: 'Sallatë jeshile', desc: '', price: '350 LEK' },
    ],
    '❄️ Antipasta të Ftohta': [
      { name: 'Brusketë klasike', desc: '', price: '250 LEK' },
      { name: 'Brusketë ulliri', desc: '', price: '300 LEK' },
      { name: 'Tartar viçi', desc: '', price: '650 LEK' },
      { name: 'Tartar salmoni', desc: '', price: '800 LEK' },
      { name: 'Karpaco levrek', desc: '', price: '1100 LEK' },
      { name: 'Karkalec krudo', desc: '', price: '2000 LEK' },
      { name: 'Salmon gravalaks', desc: '', price: '1000 LEK' },
      { name: 'Oktapod i marinuar', desc: '', price: '1200 LEK' },
      { name: 'Kungulleshë zgare', desc: '', price: '350 LEK' },
      { name: 'Proshutë e bërë vetë', desc: '', price: '800 LEK' },
      { name: 'Rosto viçi me ton', desc: '', price: '900 LEK' },
      { name: 'Skampi crudo', desc: '', price: '3000 LEK' },
    ],
    '🔥 Antipasta të Ngrohta': [
      { name: 'Djath furre', desc: '', price: '450 LEK' },
      { name: 'Qofte shtëpie', desc: '', price: '550 LEK' },
      { name: 'Kërpudha soté', desc: '', price: '300 LEK' },
      { name: 'Spring Rolls', desc: '', price: '400 LEK' },
      { name: 'Karkalec zgare', desc: '', price: '1000 LEK' },
      { name: 'Mix fritir', desc: '', price: '1200 LEK' },
      { name: 'Tavë karkaleci', desc: '', price: '1100 LEK' },
      { name: 'Oktapod pikant', desc: '', price: '1100 LEK' },
      { name: 'Kallamar & fasule', desc: '', price: '1100 LEK' },
    ],
    '🍝 Pasta': [
      { name: 'Linguini fruta deti', desc: '', price: '800 LEK' },
      { name: 'Linguini karkalec', desc: '', price: '800 LEK' },
      { name: 'Pakeri karkalec', desc: '', price: '900 LEK' },
      { name: 'Taliatele me mish', desc: '', price: '600 LEK' },
      { name: 'Pené bolonjeze', desc: '', price: '600 LEK' },
      { name: 'Spageti me domate', desc: '', price: '500 LEK' },
      { name: 'Spageti me pesto & burrata', desc: '', price: '800 LEK' },
    ],
    '🍚 Rizoto': [
      { name: 'Rizoto me perime', desc: '', price: '450 LEK' },
      { name: 'Rizoto spinaq', desc: '', price: '500 LEK' },
      { name: 'Rizoto tartuf', desc: '', price: '600 LEK' },
      { name: 'Rizoto me mish', desc: '', price: '600 LEK' },
      { name: 'Rizoto karkalec', desc: '', price: '800 LEK' },
      { name: 'Rizoto fruta deti', desc: '', price: '800 LEK' },
    ],
    '🐟 Peshku': [
      { name: 'Fileto peshku', desc: '', price: '1100 LEK' },
      { name: 'Salmon zgare', desc: '', price: '1100 LEK' },
      { name: 'Oktapod zgare', desc: '', price: '1200 LEK' },
    ],
    '🥩 Mishi': [
      { name: 'Fileto pule', desc: '', price: '800 LEK' },
      { name: 'Biftek zgare', desc: '', price: '1000 LEK' },
      { name: 'Berxollë viçi', desc: '', price: '1000 LEK' },
      { name: 'Brinjë viçi', desc: '', price: '1100 LEK' },
      { name: 'Fileto viçi', desc: '', price: '1500 LEK' },
    ],
    '🍰 Ëmbëlsira': [
      { name: 'Sufle me akullore', desc: '', price: '450 LEK' },
      { name: 'Cheesecake', desc: '', price: '400 LEK' },
      { name: 'Tiramisu', desc: '', price: '300 LEK' },
    ],
  },



  DE: {
  '🥣 Tagessuppen': [
    { name: 'Rindfleischsuppe', desc: '', price: '450 LEK' },
    { name: 'Fischsuppe', desc: '', price: '450 LEK' },
    { name: 'Gemüsesuppe', desc: '', price: '350 LEK' },
  ],
  '🥗 Salate': [
    { name: 'Shpresa-Salat', desc: '', price: '600 LEK' },
    { name: 'Delikatessalat', desc: '', price: '550 LEK' },
    { name: 'Caesar mit Garnelen', desc: '', price: '600 LEK' },
    { name: 'Caesar mit Hähnchen', desc: '', price: '500 LEK' },
    { name: 'Rucola', desc: '', price: '500 LEK' },
    { name: 'Griechischer Salat', desc: '', price: '450 LEK' },
    { name: 'Bauernsalat', desc: '', price: '400 LEK' },
    { name: 'Grüner Salat', desc: '', price: '350 LEK' },
  ],
  '❄️ Kalte Antipasti': [
    { name: 'Klassische Bruschetta', desc: '', price: '250 LEK' },
    { name: 'Oliven-Bruschetta', desc: '', price: '300 LEK' },
    { name: 'Rindertatar', desc: '', price: '650 LEK' },
    { name: 'Lachstatar', desc: '', price: '800 LEK' },
    { name: 'Seebarsch-Carpaccio', desc: '', price: '1100 LEK' },
    { name: 'Rohgarnelen', desc: '', price: '2000 LEK' },
    { name: 'Graved Lachs', desc: '', price: '1000 LEK' },
    { name: 'Marinierter Oktopus', desc: '', price: '1200 LEK' },
    { name: 'Gegrillte Zucchini', desc: '', price: '350 LEK' },
    { name: 'Hausgemachter Schinken', desc: '', price: '800 LEK' },
    { name: 'Rinderbraten mit Thunfischsauce', desc: '', price: '900 LEK' },
    { name: 'Roh Scampi', desc: '', price: '3000 LEK' },
  ],
  '🔥 Warme Antipasti': [
    { name: 'Gebackener Käse', desc: '', price: '450 LEK' },
    { name: 'Hausgemachte Fleischbällchen', desc: '', price: '550 LEK' },
    { name: 'Gebratene Pilze', desc: '', price: '300 LEK' },
    { name: 'Frühlingsrollen', desc: '', price: '400 LEK' },
    { name: 'Gegrillte Garnelen', desc: '', price: '1000 LEK' },
    { name: 'Gemischte Frittura', desc: '', price: '1200 LEK' },
    { name: 'Garnelenauflauf', desc: '', price: '1100 LEK' },
    { name: 'Scharfer Oktopus', desc: '', price: '1100 LEK' },
    { name: 'Tintenfisch & Bohnen', desc: '', price: '1100 LEK' },
  ],
  '🍝 Pasta': [
    { name: 'Linguine mit Meeresfrüchten', desc: '', price: '800 LEK' },
    { name: 'Linguine mit Garnelen', desc: '', price: '800 LEK' },
    { name: 'Paccheri mit Garnelen', desc: '', price: '900 LEK' },
    { name: 'Tagliatelle mit Fleisch', desc: '', price: '600 LEK' },
    { name: 'Penne Bolognese', desc: '', price: '600 LEK' },
    { name: 'Spaghetti mit Tomaten', desc: '', price: '500 LEK' },
    { name: 'Spaghetti mit Pesto & Burrata', desc: '', price: '800 LEK' },
  ],
  '🍚 Risotto': [
    { name: 'Gemüse-Risotto', desc: '', price: '450 LEK' },
    { name: 'Spinat-Risotto', desc: '', price: '500 LEK' },
    { name: 'Trüffel-Risotto', desc: '', price: '600 LEK' },
    { name: 'Fleisch-Risotto', desc: '', price: '600 LEK' },
    { name: 'Garnelen-Risotto', desc: '', price: '800 LEK' },
    { name: 'Meeresfrüchte-Risotto', desc: '', price: '800 LEK' },
  ],
  '🐟 Fisch': [
    { name: 'Fischfilet', desc: '', price: '1100 LEK' },
    { name: 'Gegrillter Lachs', desc: '', price: '1100 LEK' },
    { name: 'Gegrillter Oktopus', desc: '', price: '1200 LEK' },
  ],
  '🥩 Fleisch': [
    { name: 'Hähnchenfilet', desc: '', price: '800 LEK' },
    { name: 'Gegrilltes Rindersteak', desc: '', price: '1000 LEK' },
    { name: 'Kalbskotelett', desc: '', price: '1000 LEK' },
    { name: 'Kalbsrippen', desc: '', price: '1100 LEK' },
    { name: 'Rinderfilet', desc: '', price: '1500 LEK' },
  ],
  '🍰 Desserts': [
    { name: 'Soufflé mit Eis', desc: '', price: '450 LEK' },
    { name: 'Käsekuchen', desc: '', price: '400 LEK' },
    { name: 'Tiramisu', desc: '', price: '300 LEK' },
  ],
},


IT: {
  '🥣 Zuppe del Giorno': [
    { name: 'Zuppa di manzo', desc: '', price: '450 LEK' },
    { name: 'Zuppa di pesce', desc: '', price: '450 LEK' },
    { name: 'Zuppa di verdure', desc: '', price: '350 LEK' },
  ],
  '🥗 Insalate': [
    { name: 'Insalata Shpresa', desc: '', price: '600 LEK' },
    { name: 'Insalata Delikatese', desc: '', price: '550 LEK' },
    { name: 'Caesar con gamberi', desc: '', price: '600 LEK' },
    { name: 'Caesar con pollo', desc: '', price: '500 LEK' },
    { name: 'Rucola', desc: '', price: '500 LEK' },
    { name: 'Greca', desc: '', price: '450 LEK' },
    { name: 'Insalata contadina', desc: '', price: '400 LEK' },
    { name: 'Insalata verde', desc: '', price: '350 LEK' },
  ],
  '❄️ Antipasti Freddi': [
    { name: 'Bruschetta classica', desc: '', price: '250 LEK' },
    { name: 'Bruschetta alle olive', desc: '', price: '300 LEK' },
    { name: 'Tartare di manzo', desc: '', price: '650 LEK' },
    { name: 'Tartare di salmone', desc: '', price: '800 LEK' },
    { name: 'Carpaccio di branzino', desc: '', price: '1100 LEK' },
    { name: 'Gamberi crudi', desc: '', price: '2000 LEK' },
    { name: 'Salmone gravlax', desc: '', price: '1000 LEK' },
    { name: 'Polpo marinato', desc: '', price: '1200 LEK' },
    { name: 'Zucchine grigliate', desc: '', price: '350 LEK' },
    { name: 'Prosciutto fatto in casa', desc: '', price: '800 LEK' },
    { name: 'Roast beef con tonno', desc: '', price: '900 LEK' },
    { name: 'Scampi crudi', desc: '', price: '3000 LEK' },
  ],
  '🔥 Antipasti Caldi': [
    { name: 'Formaggio al forno', desc: '', price: '450 LEK' },
    { name: 'Polpette fatte in casa', desc: '', price: '550 LEK' },
    { name: 'Funghi saltati', desc: '', price: '300 LEK' },
    { name: 'Involtini primavera', desc: '', price: '400 LEK' },
    { name: 'Gamberi alla griglia', desc: '', price: '1000 LEK' },
    { name: 'Frittura mista', desc: '', price: '1200 LEK' },
    { name: 'Tegamino di gamberi', desc: '', price: '1100 LEK' },
    { name: 'Polpo piccante', desc: '', price: '1100 LEK' },
    { name: 'Calamari e fagioli', desc: '', price: '1100 LEK' },
  ],
  '🍝 Pasta': [
    { name: 'Linguine ai frutti di mare', desc: '', price: '800 LEK' },
    { name: 'Linguine ai gamberi', desc: '', price: '800 LEK' },
    { name: 'Paccheri ai gamberi', desc: '', price: '900 LEK' },
    { name: 'Tagliatelle con carne', desc: '', price: '600 LEK' },
    { name: 'Penne alla bolognese', desc: '', price: '600 LEK' },
    { name: 'Spaghetti al pomodoro', desc: '', price: '500 LEK' },
    { name: 'Spaghetti al pesto e burrata', desc: '', price: '800 LEK' },
  ],
  '🍚 Risotti': [
    { name: 'Risotto alle verdure', desc: '', price: '450 LEK' },
    { name: 'Risotto agli spinaci', desc: '', price: '500 LEK' },
    { name: 'Risotto al tartufo', desc: '', price: '600 LEK' },
    { name: 'Risotto con carne', desc: '', price: '600 LEK' },
    { name: 'Risotto ai gamberi', desc: '', price: '800 LEK' },
    { name: 'Risotto ai frutti di mare', desc: '', price: '800 LEK' },
  ],
  '🐟 Pesce': [
    { name: 'Filetto di pesce', desc: '', price: '1100 LEK' },
    { name: 'Salmone alla griglia', desc: '', price: '1100 LEK' },
    { name: 'Polpo alla griglia', desc: '', price: '1200 LEK' },
  ],
  '🥩 Carne': [
    { name: 'Filetto di pollo', desc: '', price: '800 LEK' },
    { name: 'Bistecca alla griglia', desc: '', price: '1000 LEK' },
    { name: 'Braciola di vitello', desc: '', price: '1000 LEK' },
    { name: 'Costolette di vitello', desc: '', price: '1100 LEK' },
    { name: 'Filetto di vitello', desc: '', price: '1500 LEK' },
  ],
  '🍰 Dolci': [
    { name: 'Soufflé con gelato', desc: '', price: '450 LEK' },
    { name: 'Cheesecake', desc: '', price: '400 LEK' },
    { name: 'Tiramisù', desc: '', price: '300 LEK' },
  ],
},
ZH: {
  '🥣 今日汤品': [
    { name: '牛肉汤', desc: '', price: '450 LEK' },
    { name: '鱼汤', desc: '', price: '450 LEK' },
    { name: '蔬菜汤', desc: '', price: '350 LEK' },
  ],
  '🥗 沙拉': [
    { name: 'Shpresa沙拉', desc: '', price: '600 LEK' },
    { name: 'Delikatese沙拉', desc: '', price: '550 LEK' },
    { name: '凯撒沙拉（虾）', desc: '', price: '600 LEK' },
    { name: '凯撒沙拉（鸡肉）', desc: '', price: '500 LEK' },
    { name: '芝麻菜沙拉', desc: '', price: '500 LEK' },
    { name: '希腊沙拉', desc: '', price: '450 LEK' },
    { name: '乡村沙拉', desc: '', price: '400 LEK' },
    { name: '绿色沙拉', desc: '', price: '350 LEK' },
  ],
  '❄️ 冷前菜': [
    { name: '经典意式烤面包', desc: '', price: '250 LEK' },
    { name: '橄榄意式烤面包', desc: '', price: '300 LEK' },
    { name: '牛肉鞑靼', desc: '', price: '650 LEK' },
    { name: '三文鱼鞑靼', desc: '', price: '800 LEK' },
    { name: '鲈鱼生鱼片', desc: '', price: '1100 LEK' },
    { name: '生虾', desc: '', price: '2000 LEK' },
    { name: '腌三文鱼', desc: '', price: '1000 LEK' },
    { name: '腌章鱼', desc: '', price: '1200 LEK' },
    { name: '烤西葫芦', desc: '', price: '350 LEK' },
    { name: '自制火腿', desc: '', price: '800 LEK' },
    { name: '金枪鱼牛肉卷', desc: '', price: '900 LEK' },
    { name: '生小龙虾', desc: '', price: '3000 LEK' },
  ],
  '🔥 热前菜': [
    { name: '烤奶酪', desc: '', price: '450 LEK' },
    { name: '自制肉丸', desc: '', price: '550 LEK' },
    { name: '炒蘑菇', desc: '', price: '300 LEK' },
    { name: '春卷', desc: '', price: '400 LEK' },
    { name: '烤虾', desc: '', price: '1000 LEK' },
    { name: '炸物拼盘', desc: '', price: '1200 LEK' },
    { name: '烤虾锅', desc: '', price: '1100 LEK' },
    { name: '香辣章鱼', desc: '', price: '1100 LEK' },
    { name: '鱿鱼豆类', desc: '', price: '1100 LEK' },
  ],
  '🍝 意大利面': [
    { name: '海鲜意面', desc: '', price: '800 LEK' },
    { name: '虾仁意面', desc: '', price: '800 LEK' },
    { name: '宽管面配虾', desc: '', price: '900 LEK' },
    { name: '肉酱宽面', desc: '', price: '600 LEK' },
    { name: '波隆那意面', desc: '', price: '600 LEK' },
    { name: '番茄意面', desc: '', price: '500 LEK' },
    { name: '香蒜酱意面配布拉塔', desc: '', price: '800 LEK' },
  ],
  '🍚 烩饭': [
    { name: '蔬菜烩饭', desc: '', price: '450 LEK' },
    { name: '菠菜烩饭', desc: '', price: '500 LEK' },
    { name: '松露烩饭', desc: '', price: '600 LEK' },
    { name: '牛肉烩饭', desc: '', price: '600 LEK' },
    { name: '虾仁烩饭', desc: '', price: '800 LEK' },
    { name: '海鲜烩饭', desc: '', price: '800 LEK' },
  ],
  '🐟 鱼类': [
    { name: '鱼排', desc: '', price: '1100 LEK' },
    { name: '烤三文鱼', desc: '', price: '1100 LEK' },
    { name: '烤章鱼', desc: '', price: '1200 LEK' },
  ],
  '🥩 肉类': [
    { name: '鸡胸肉', desc: '', price: '800 LEK' },
    { name: '烤牛排', desc: '', price: '1000 LEK' },
    { name: '小牛排', desc: '', price: '1000 LEK' },
    { name: '牛小排', desc: '', price: '1100 LEK' },
    { name: '牛里脊', desc: '', price: '1500 LEK' },
  ],
  '🍰 甜点': [
    { name: '熔岩蛋糕配冰淇淋', desc: '', price: '450 LEK' },
    { name: '芝士蛋糕', desc: '', price: '400 LEK' },
    { name: '提拉米苏', desc: '', price: '300 LEK' },
  ],
},
};

function FoodAppScreen() {
  const [lang, setLang] = useState('EN');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('');

  const menu = MENU_ITEMS[lang] || {};
  const categories = Object.keys(menu);

  useEffect(() => {
    if (!activeTab || !categories.includes(activeTab)) {
      setActiveTab(categories[0] || '');
    }
  }, [lang, categories]);

  return (
    <div className="container">
      <header>
        <h1 className="title">Restaurant Shpresa</h1>
      </header>

      <div className="languageSelector">
        {LANGUAGES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => { setLang(code); setSearch(''); }}
            className={lang === code ? 'active' : ''}
          >
            {label} {code}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="🔍 Search menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />

      <div className="categoryTabs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`tabButton${activeTab === cat ? ' active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {activeTab && menu[activeTab]?.length > 0 ? (
        <div className="section">
          <h2 className="sectionTitle">{activeTab}</h2>
          {menu[activeTab]
            .filter(item =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.desc?.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, idx) => (
              <div key={idx} className="card">
                <div>
                  <h3 className="itemName">{item.name}</h3>
                  {item.desc && <p className="itemDesc">{item.desc}</p>}
                </div>
                <p className="itemPrice">
                  {item.price} ({convertToEuro(item.price)})
                </p>
              </div>
            ))}
        </div>
      ) : (
        <p className="noResult">No items found. Try a different category or search term.</p>
      )}
    </div>
  );
}

export default FoodAppScreen;
