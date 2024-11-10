import ImageLibrary from '@/components/ImageLibrary'
import PageContainer from '@/components/layout/page-container';
import React from 'react'

export const metadata = {
    title: 'Dashboard : Images'
};
function page() {
    return (
        <PageContainer scrollable>
            <ImageLibrary />
        </PageContainer>
    )
}

export default page