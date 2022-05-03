import dayjs from 'dayjs'

// 日本語表示にするためlocaleを追加
import 'dayjs/locale/ja'
dayjs.locale('ja')

export default ({ app }, inject) => {
   inject('dayjs', ((string) => dayjs(string)))
}