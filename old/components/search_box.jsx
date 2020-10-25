import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'

const SearchBox = () => (
  <div className='control has-icons-right'>
    <input className='input' type='text' placeholder='Que estás para ai a dizer?' />
    <span className='icon is-small is-right'>
      <Icon path={mdiMagnify} size='1.5rem' />
    </span>
  </div>
)

export default SearchBox
