import 'bootstrap/dist/css/bootstrap.min.css';
import { LibraryService } from './services/LibraryService';
import { mount } from './ui/render';

mount(document.getElementById('app') as HTMLElement, new LibraryService());
