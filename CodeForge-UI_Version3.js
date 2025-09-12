import React, { useState } from 'react';

const buttonVariants = {
  primary: {
    background: '#2d8cf0',
    color: '#fff',
    border: 'none'
  },
  secondary: {
    background: '#fff',
    color: '#2d8cf0',
    border: '1px solid #2d8cf0'
  },
  danger: {
    background: '#ff4d4f',
    color: '#fff',
    border: 'none'
  }
};

export function ModernButton({
  children,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon = null,
  onClick,
  style = {},
  ariaLabel = '',
  tabIndex = 0,
  ...props
}) {
  const [pressed, setPressed] = useState(false);

  function handleKeyDown(e) {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled && !loading) {
      setPressed(true);
      if (onClick) onClick(e);
    }
  }
  function handleKeyUp(e) {
    setPressed(false);
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-disabled={disabled || loading}
      disabled={disabled || loading}
      tabIndex={tabIndex}
      style={{
        ...buttonVariants[variant],
        padding: '12px 24px',
        borderRadius: 8,
        fontWeight: 'bold',
        fontSize: 16,
        opacity: disabled || loading ? 0.55 : 1,
        boxShadow: pressed ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 4px rgba(0,0,0,0.08)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.18s, box-shadow 0.18s',
        outline: pressed ? '2px solid #2d8cf0' : 'none',
        ...style
      }}
      onClick={disabled || loading ? undefined : onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      {...props}
    >
      {loading ? (
        <span style={{ marginRight: 8 }}>
          <svg width="18" height="18" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#ddd" strokeWidth="5" />
            <path d="M25 5a20 20 0 1 1-0.001 0" fill="none" stroke="#2d8cf0" strokeWidth="5" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
            </path>
          </svg>
        </span>
      ) : icon ? <span style={{ marginRight: 8 }}>{icon}</span> : null}
      {children}
    </button>
  );
}

// Card component
export function Card({ children, title, style = {}, ...props }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 1px 8px rgba(0,0,0,0.10)',
        padding: 24,
        margin: 12,
        ...style
      }}
      {...props}
    >
      {title && <h3 style={{ marginBottom: 12 }}>{title}</h3>}
      {children}
    </div>
  );
}

// Input component
export function Input({
  value,
  onChange,
  placeholder,
  disabled = false,
  type = 'text',
  style = {},
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        padding: '10px 14px',
        borderRadius: 6,
        border: '1px solid #ddd',
        fontSize: 15,
        outline: 'none',
        marginBottom: 10,
        ...style
      }}
      {...props}
    />
  );
}

// Checkbox component
export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  style = {},
  ...props
}) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', marginBottom: 10, ...style }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{ marginRight: 8 }}
        {...props}
      />
      {label}
    </label>
  );
}

// Demo component
export function ModernUIShowcase() {
  const [checked, setChecked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <Card title="Modern UI Showcase">
      <Input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="Type something..." />
      <Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} label="Check me!" />
      <ModernButton variant="primary" onClick={() => alert('Button pressed!')}>Showcase Button</ModernButton>
      <ModernButton loading={loading} onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
      }} style={{ marginLeft: 12 }}>Loading</ModernButton>
      <ModernButton variant="danger" disabled style={{ marginLeft: 12 }}>Danger (Disabled)</ModernButton>
    </Card>
  );
}

// List component
export function List({ items, renderItem, style = {}, ...props }) {
  return (
    <ul style={{ padding: 0, margin: 12, ...style }} {...props}>
      {items.map((item, idx) => <li key={idx} style={{ listStyle: 'none', margin: '8px 0' }}>{renderItem(item)}</li>)}
    </ul>
  );
}

// Tabs component
export function Tabs({ tabs, active, onTab, style = {}, ...props }) {
  return (
    <div style={{ ...style }} {...props}>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        {tabs.map((t, idx) => (
          <button key={idx}
            style={{
              background: active === idx ? '#2d8cf0' : '#fff',
              color: active === idx ? '#fff' : '#2d8cf0',
              border: '1px solid #2d8cf0',
              borderRadius: 8,
              marginRight: 8,
              padding: '8px 18px',
              cursor: 'pointer'
            }}
            onClick={() => onTab(idx)}
          >{t}</button>
        ))}
      </div>
    </div>
  );
}

// Accessible Modal
export function Modal({ open, onClose, children, style = {}, ...props }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', zIndex: 999
    }}>
      <div style={{
        maxWidth: 400, margin: '10vh auto', background: '#fff', borderRadius: 16,
        padding: 32, ...style
      }} {...props}>
        {children}
        <ModernButton variant="danger" onClick={onClose}>Close</ModernButton>
      </div>
    </div>
  );
}

// Documentation component
export function Docs() {
  return (
    <Card title="Component API">
      <List items={[
        "ModernButton: Customizable, accessible button.",
        "Card: Clean container for content.",
        "Input: Accessible form input.",
        "Checkbox: Customizable checkbox.",
        "Tabs: Tab navigation.",
        "Modal: Accessible dialog modal.",
      ]} renderItem={item => <span>{item}</span>} />
    </Card>
  );
}

// Export all components
export default {
  ModernButton,
  Card,
  Input,
  Checkbox,
  ModernUIShowcase,
  List,
  Tabs,
  Modal,
  Docs
};