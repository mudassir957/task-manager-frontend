import Link from 'next/link';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-white h-screen p-5">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link href="/tasks" className="block p-2 hover:bg-gray-700 rounded">
                            Tasks
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" className="block p-2 hover:bg-gray-700 rounded">
                            Projects
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
