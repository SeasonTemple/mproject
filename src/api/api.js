import axios from '_u/axios';
import qs from 'qs';

const owl = {}

owl.send = (config, cb) => {
  axios(config).then(res => {
    let len, status
    len = res.data.length;
    status = res.status
    if (len > 0) {
      if (status === 201 || status === 200) {
        cb(res.data)
      } else {
        throw new Error(`Request failed ${qs.stringify(res.data+res.statusText)}: You expected result is not found.`)
      }
    }
  }).catch(res => console.error(`Request failed ${res}: You may need wait for minutes of try again.`))
}

export default () => {
  window.owl = owl
};