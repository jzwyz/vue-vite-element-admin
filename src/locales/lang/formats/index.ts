import numberFormats from './number_format.json'
import datetimeFormats from './datetime_format.json'

export default {
    numberFormats: {
        ...numberFormats
    },
    datetimeFormats: {
        ...datetimeFormats
    } as any
}