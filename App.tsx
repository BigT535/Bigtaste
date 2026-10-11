import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext.tsx';
import { StaffAuthProvider } from './context/StaffAuthContext.tsx';
import { api } from './services/api.ts';
import type { MenuItem, RestaurantSettings } from './types/restaurant.ts';

import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { ItemCustomizationModal } from './components/ItemCustomizationModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { OrderTrackingView } from './components/OrderTrackingView.tsx';
import { WhyChooseSection } from './components/WhyChooseSection.tsx';
import { HowOrderingWorksSection } from './components/HowOrderingWorksSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { KitchenDashboard } from './components/kitchen/KitchenDashboard.tsx';

function MainApp() {
  const { addItem, setSettings } = useCart();

  // Navigation states
  const [currentView, setCurrentView] = useState<'customer' | 'kitchen' | 'tracking'>('customer');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [trackingToken, setTrackingToken] = useState<string | null>(null);

  // Modals & drawers
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [settings, setLocalSettings] = useState<RestaurantSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle URL hash changes for deep linking (#kitchen, #track=TOKEN)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (hash.startsWith('#kitchen') || path === '/kitchen' || path.startsWith('/kitchen')) {
        setCurrentView('kitchen');
      } else if (hash.startsWith('#track=')) {
        const token = hash.replace('#track=', '');
        if (token) {
          setTrackingToken(token);
          setCurrentView('tracking');
        }
      } else if (path.startsWith('/orders/track/')) {
        const token = path.replace('/orders/track/', '');
        if (token) {
          setTrackingToken(token);
          setCurrentView('tracking');
        }
      } else {
        setCurrentView('customer');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  // Fetch initial restaurant data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [menuRes, settingsRes] = await Promise.all([
        api.getMenu().catch(() => []),
        api.getSettings().catch(() => null),
      ]);
      setMenuItems(menuRes);
      if (settingsRes) {
        setLocalSettings(settingsRes);
        setSettings(settingsRes);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Navigation handlers
  const handleNavigateSection = (sectionId: string) => {
    setCurrentView('customer');
    setActiveSection(sectionId);
    if (window.history.pushState && window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    window.location.hash = '';

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenKitchen = () => {
    if (window.history.pushState) {
      window.history.pushState({}, '', '/kitchen');
    }
    window.location.hash = '#kitchen';
    setCurrentView('kitchen');
  };

  const handleBackToCustomer = () => {
    if (window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
    window.location.hash = '';
    setCurrentView('customer');
  };

  // Order placed callback
  const handleOrderSuccess = (orderData: { id: string; trackingToken: string }) => {
    setTrackingToken(orderData.trackingToken);
    window.location.hash = `#track=${orderData.trackingToken}`;
    if (window.history.pushState) {
      window.history.pushState({}, '', `/orders/track/${orderData.trackingToken}`);
    }
    setCurrentView('tracking');
  };

  // Item customization & add
  const handleItemSelect = (item: MenuItem) => {
    // If item has options, open customization modal
    if (item.customizations && item.customizations.length > 0) {
      setCustomizingItem(item);
    } else {
      // Add directly
      addItem(item, 1, []);
    }
  };

  // Render Kitchen View if selected
  if (currentView === 'kitchen') {
    return (
      <KitchenDashboard
        onBackToCustomerSite={handleBackToCustomer}
        settings={settings}
        onRefreshSettings={fetchData}
      />
    );
  }

  // Render Order Tracking View if selected
  if (currentView === 'tracking' && trackingToken) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between">
        <Header
          onNavigate={handleNavigateSection}
          activeSection={activeSection}
        />
        <main className="flex-1">
          <OrderTrackingView
            trackingToken={trackingToken}
            onBackToMenu={() => handleNavigateSection('menu')}
            settings={settings}
          />
        </main>
        <Footer
          onNavigate={handleNavigateSection}
          onOpenKitchen={handleOpenKitchen}
          settings={settings}
        />
      </div>
    );
  }

  // Render Main Customer Storefront
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between selection:bg-[#dc2626] selection:text-white">
      {/* Customer Header */}
      <Header
        onNavigate={handleNavigateSection}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOrderNow={() => handleNavigateSection('menu')}
          onExploreMenu={() => handleNavigateSection('menu')}
        />

        {/* Menu Section */}
        <MenuSection
          menuItems={menuItems}
          onSelectItem={handleItemSelect}
          settings={settings}
        />

        {/* Why Choose BIG TASTE */}
        <WhyChooseSection />

        {/* How Ordering Works */}
        <HowOrderingWorksSection />

        {/* Customer Testimonials */}
        <TestimonialsSection />

        {/* Opening Hours & Contact */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigateSection}
        onOpenKitchen={handleOpenKitchen}
        settings={settings}
      />

      {/* Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Item Customization Modal */}
      <ItemCustomizationModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={(item, qty, options, notes) => addItem(item, qty, options, notes)}
        settings={settings}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <StaffAuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </StaffAuthProvider>
  );
}
