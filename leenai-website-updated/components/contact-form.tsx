'use client';

import * as React from 'react';
import {useTranslations} from 'next-intl';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';

type FormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
  consent: boolean;
  website?: string; // honeypot
};

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const schema = React.useMemo(
    () =>
      z.object({
        name: z.string().min(1).max(120),
        email: z.string().email().max(200),
        company: z.string().min(1).max(200),
        message: z.string().min(1).max(4000),
        consent: z.boolean().refine((v) => v === true, {message: t('errors.consent')}),
        website: z.string().optional()
      }),
    [t]
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
      consent: false,
      website: ''
    }
  });

  async function onSubmit(values: FormValues) {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch (e) {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...form.register('website')} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input id="name" {...form.register('name')} />
          {form.formState.errors.name ? <p className="text-xs text-red-600">{form.formState.errors.name.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input id="email" type="email" {...form.register('email')} />
          {form.formState.errors.email ? <p className="text-xs text-red-600">{form.formState.errors.email.message}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">{t('company')}</Label>
        <Input id="company" {...form.register('company')} />
        {form.formState.errors.company ? <p className="text-xs text-red-600">{form.formState.errors.company.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea id="message" {...form.register('message')} />
        {form.formState.errors.message ? <p className="text-xs text-red-600">{form.formState.errors.message.message}</p> : null}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-brand-lightCyan"
          {...form.register('consent')}
        />
        <div className="space-y-1">
          <Label htmlFor="consent" className="text-sm text-brand-ink/80">
            {t('consent')}
          </Label>
          {form.formState.errors.consent ? (
            <p className="text-xs text-red-600">{form.formState.errors.consent.message}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === 'loading'}>
          {t('submit')}
        </Button>
        {status === 'success' ? <p className="text-sm text-brand-ink/80">{t('success')}</p> : null}
        {status === 'error' ? <p className="text-sm text-red-600">{t('error')}</p> : null}
      </div>

      <p className="text-xs text-brand-ink/60">{t('tip')}</p>
    </form>
  );
}
