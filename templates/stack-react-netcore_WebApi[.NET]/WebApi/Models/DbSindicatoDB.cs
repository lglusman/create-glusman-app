using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebApi.Models.Entities;

namespace WebApi.Models;

public partial class DbSindicatoDB : DbContext
{
    public DbSindicatoDB()
    {
    }

    public DbSindicatoDB(DbContextOptions<DbSindicatoDB> options)
        : base(options)
    {
    }

    public virtual DbSet<NivelEducativo> NivelesEducativos { get; set; }

    public virtual DbSet<Permiso> Permisos { get; set; }

    public virtual DbSet<Rol> Roles { get; set; }

    public virtual DbSet<RolPermiso> RolesPermisos { get; set; }

    public virtual DbSet<Sitio> Sitios { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<UsuarioRol> UsuariosRoles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("name=constring");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<NivelEducativo>(entity =>
        {
            entity.ToTable("NivelesEducativos", "dim");

            entity.Property(e => e.DescripcionNivelEducativo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.FechaAlta).HasColumnType("date");
            entity.Property(e => e.FechaBaja).HasColumnType("date");
            entity.Property(e => e.FechaModificacion).HasColumnType("datetime");
        });

        modelBuilder.Entity<Permiso>(entity =>
        {
            entity.ToTable("Permisos", "permisos");

            entity.Property(e => e.DescripcionPermiso)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaAlta)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FechaBaja).HasColumnType("datetime");
            entity.Property(e => e.FechaModificacion).HasColumnType("datetime");
            entity.Property(e => e.Url)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Sitio).WithMany(p => p.Permisos)
                .HasForeignKey(d => d.SitioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Permisos_Sitios");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.ToTable("Roles", "permisos");

            entity.Property(e => e.DescripcionRol)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaAlta)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FechaBaja).HasColumnType("datetime");
            entity.Property(e => e.FechaModificacion).HasColumnType("datetime");
        });

        modelBuilder.Entity<RolPermiso>(entity =>
        {
            entity.ToTable("RolesPermisos", "permisos");

            entity.HasIndex(e => new { e.RolId, e.PermisoId }, "UK_RolesPermisos").IsUnique();

            entity.Property(e => e.FechaAlta)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FechaBaja).HasColumnType("datetime");
            entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

            entity.HasOne(d => d.Permiso).WithMany(p => p.RolPermisos)
                .HasForeignKey(d => d.PermisoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RolesPermisos_Permisos");

            entity.HasOne(d => d.Rol).WithMany(p => p.RolPermisos)
                .HasForeignKey(d => d.RolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RolesPermisos_Roles");
        });

        modelBuilder.Entity<Sitio>(entity =>
        {
            entity.ToTable("Sitios", "permisos");

            entity.Property(e => e.DescripcionSitio)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaAlta)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FechaBaja).HasColumnType("datetime");
            entity.Property(e => e.FechaModificacion).HasColumnType("datetime");
            entity.Property(e => e.Icono).IsUnicode(false);
            entity.Property(e => e.Url)
                .HasMaxLength(150)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.ToTable("Usuarios", "permisos");

            entity.Property(e => e.FechaAlta)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FechaBaja).HasColumnType("datetime");
            entity.Property(e => e.FechaModificacion).HasColumnType("datetime");
            entity.Property(e => e.Nombre)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UsuarioRol>(entity =>
        {
            entity.ToTable("UsuariosRoles", "permisos");

            entity.HasIndex(e => new { e.UsuarioId, e.RolId }, "IX_UsuariosRoles").IsUnique();

            entity.Property(e => e.FechaAlta)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FechaBaja).HasColumnType("datetime");
            entity.Property(e => e.FechaModificacion).HasColumnType("datetime");

            entity.HasOne(d => d.Rol).WithMany(p => p.UsuarioRoles)
                .HasForeignKey(d => d.RolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UsuariosRoles_Roles");

            entity.HasOne(d => d.Usuario).WithMany(p => p.UsuarioRoles)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UsuariosRoles_Usuarios");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
