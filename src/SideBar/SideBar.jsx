import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { NavLink,Link  } from 'react-router-dom'
import './sidebar.css'
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import PaletteIcon from '@mui/icons-material/Palette';
import FolderIcon from '@mui/icons-material/Folder';

export default function SideBar(){
    return (
        <div className="d-grid position-relative">
            <ButtonGroup vertical className='myBorder m-3 shadow bg-body rounded position-fixed w-25'>
                <Link to='' className='btn btn-primary p-3 text-left'>
                    <PaletteIcon/> Dashboard
                </Link>
                <NavLink to='pages' className='btn btn-light p-3 text-left'>
                   <DescriptionIcon color='action'/> Pages
                </NavLink>
                <NavLink to='category' className='btn btn-light p-3 text-left'>
                    <FolderIcon color='action'/> Categories
                </NavLink>
                <NavLink to='users' className='btn btn-light p-3 text-left'>
                    <PeopleIcon color='action'/> User Accounts
                </NavLink>
            </ButtonGroup>
        </div>
    )
}