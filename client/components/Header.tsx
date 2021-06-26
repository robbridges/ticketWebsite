import Link from 'next/link';

//todo fix this type it shouldn't be any
const Header = ({currentUser} : any) => {
// cool little trick to filter out what labels we want rendered I found
// it checks for the condition and then returs just that label, and we then wrap it

const links: {}[] =  [
  !currentUser && {label: 'Sign up', href: '/auth/signup'},
  !currentUser && {label: 'Sign in', href: '/auth/signin'},
  currentUser && {label: 'Sign out', href: '/auth/signout'}
]
  .filter(linkConfig => linkConfig)
  .map(({label, href}) => {
    return <li key={href} className="nav-item">
      <Link href={href}>
            <a className="nav-link">{label}</a>
        </Link>
    </li>
  })

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className = "nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  )
}

export default Header;