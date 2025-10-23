import './salesList.scss'
import BreadcrumbReact from '../../../components/common-components/breadcrumb/Breadcrumb';
const SalesList = () => {
    return (
        <div className="salesListHome">
            <div className="salesListContainer">
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'Sales List' }]}
                />
                <BreadcrumbReact
                    items={[
                        { label: 'Dashboard', url: '/dashboard/admin-dashboard' },
                        { label: 'Sales List' }]}
                />
            </div>
        </div >
    )
}
export default SalesList;
