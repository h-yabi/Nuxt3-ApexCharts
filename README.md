# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn generate
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.



# API について
## URL
https://corona.go.jp/dashboard/

## 使用しているAPIについて
>各国別感染者数・死亡者数 オープンデータ
各国別感染者数・死亡者数をJSON形式でご利用いただけます。
https://opendata.corona.go.jp/api/OccurrenceStatusOverseas
>
>・国の絞り込み
クエリ文字列をdataName=国名の形で付与すれば絞り込みデータの抽出が可能です。
例　日本のデータ
https://opendata.corona.go.jp/api/OccurrenceStatusOverseas?dataName=日本
※複数は指定できません
>
>・日付を指定したデータ
2020年5月9日のデータを取得できます。
クエリ文字列をdate=yyyymmdd　で日付を指定してください
例
https://opendata.corona.go.jp/api/OccurrenceStatusOverseas?date=20200509
※さらに絞り込み用のクエリ文字列を付与し絞り込むことも可能です
例
https://opendata.corona.go.jp/api/OccurrenceStatusOverseas?date=20200509&dataName=日本g
